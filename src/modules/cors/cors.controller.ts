import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CorsService } from './cors.service';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreateOriginDto } from './dto/create-origin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CORS')
@UseGuards(RolesGuard)
@Controller('admin/cors')
export class CorsController {
  constructor(private readonly corsService: CorsService) {}

  @Post()
  @Roles(Role.ADMIN)
  async addOrigin(@Body() dto: CreateOriginDto) {
    return this.corsService.addOrigin(dto.url);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async removeOrigin(@Param('id') id: string) {
    return this.corsService.removeOrigin(id);
  }

  @Get()
  @Roles(Role.ADMIN)
  async listOrigins() {
    return this.corsService.listOrigins();
  }
}
