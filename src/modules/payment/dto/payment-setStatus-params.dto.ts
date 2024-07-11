import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PaymentSetStatusParamsDto {
  @Expose()
  @ApiProperty()
  @IsUUID(4, { each: true })
  ids: string[];
}
