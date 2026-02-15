import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('BlogService', () => {
  let service: BlogService;
  let prisma: PrismaService;

  const mockPrismaService = {
    post: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a post if found', async () => {
      const mockPost = {
        id: '1',
        slug: 'test-post',
        title: 'Test Post',
        author: { username: 'testuser' },
      };
      mockPrismaService.post.findUnique.mockResolvedValue(mockPost);

      const result = await service.findOne('test-post');

      expect(result).toEqual(mockPost);
      expect(prisma.post.findUnique).toHaveBeenCalledWith({
        where: { slug: 'test-post' },
        include: { author: { select: { username: true } } },
      });
    });

    it('should throw NotFoundException if post not found', async () => {
      mockPrismaService.post.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent')).rejects.toThrow(
        new NotFoundException('Post not found'),
      );
    });
  });
});
