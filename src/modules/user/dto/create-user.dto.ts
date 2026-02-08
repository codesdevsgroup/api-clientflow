import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'strongPassword123' })
  password: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({ enum: Role, default: Role.RESELLER })
  role?: Role;
}
