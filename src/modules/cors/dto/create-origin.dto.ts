import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOriginDto {
  @IsUrl({ require_tld: false })
  @ApiProperty()
  url: string;
}
