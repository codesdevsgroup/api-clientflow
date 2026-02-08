import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../decorators/is-public.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Blog')
@UseGuards(RolesGuard)
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.blogService.create(createPostDto, req.user.id);
  }

  @Get()
  @IsPublic()
  findAll() {
    return this.blogService.findAll(true);
  }

  @Get('admin')
  @Roles(Role.ADMIN)
  findAllAdmin() {
    return this.blogService.findAll(false);
  }

  @Get(':slug')
  @IsPublic()
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.blogService.update(id, updatePostDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
