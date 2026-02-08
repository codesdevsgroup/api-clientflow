import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: string) {
    const existing = await this.prisma.post.findUnique({
      where: { slug: createPostDto.slug },
    });
    if (existing) {
      throw new ConflictException('Slug already exists');
    }

    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId,
      },
    });
  }

  async findAll(publishedOnly = true) {
    const where = publishedOnly ? { published: true } : {};
    return this.prisma.post.findMany({
      where,
      include: { author: { select: { username: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: { author: { select: { username: true } } },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
