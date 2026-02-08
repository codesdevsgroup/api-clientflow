import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class CorsService {
  constructor(private readonly prisma: PrismaService) {}

  async addOrigin(url: string) {
    const existing = await this.prisma.allowedOrigin.findUnique({
      where: { url },
    });
    if (existing) {
      throw new ConflictException('Origin already allowed');
    }
    return this.prisma.allowedOrigin.create({ data: { url } });
  }

  async removeOrigin(id: string) {
    return this.prisma.allowedOrigin.delete({ where: { id } });
  }

  async listOrigins() {
    return this.prisma.allowedOrigin.findMany();
  }

  async isOriginAllowed(origin: string): Promise<boolean> {
    if (!origin) return true; // Allow non-browser requests (e.g. Postman)
    const allowed = await this.prisma.allowedOrigin.findUnique({
      where: { url: origin },
    });
    return !!allowed;
  }
}
