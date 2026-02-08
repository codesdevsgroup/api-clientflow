import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('User')
@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('resellers')
  @Roles(Role.ADMIN)
  async createReseller(@Body() createUserDto: CreateUserDto) {
    createUserDto.role = Role.RESELLER;
    return this.userService.create(createUserDto);
  }

  @Get('resellers')
  @Roles(Role.ADMIN)
  async listResellers() {
    return this.userService.findAll(Role.RESELLER);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findOne(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
