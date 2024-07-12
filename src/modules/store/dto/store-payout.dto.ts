import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class StorePayoutDto {
  @Expose()
  @ApiProperty()
  paymentId: string;

  @Expose()
  @ApiProperty()
  amount: number;
}
