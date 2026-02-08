import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsString()
  @ApiProperty()
  slug: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: false })
  published?: boolean;
}
