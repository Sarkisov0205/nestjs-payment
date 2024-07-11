import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min } from 'class-validator';

@Exclude()
export class CreatePaymentDto {
  @Expose()
  @ApiProperty()
  @IsUUID(4)
  store: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  amount: number;
}
