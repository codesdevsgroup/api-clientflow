import { Module } from '@nestjs/common';
import { CorsService } from './cors.service';
import { CorsController } from './cors.controller';
import { PrismaModule } from '../../services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CorsController],
  providers: [CorsService],
  exports: [CorsService],
})
export class CorsModule {}
