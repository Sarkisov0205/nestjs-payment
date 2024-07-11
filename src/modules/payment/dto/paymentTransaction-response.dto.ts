import { Exclude, Expose } from 'class-transformer';
import { PAYMENT_STATUSES } from '@/modules/payment/types';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class PaymentTransactionResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  created_at: Date;

  @Expose()
  @ApiProperty()
  status: PAYMENT_STATUSES;

  @Expose()
  @ApiProperty()
  commissionA: number;

  @Expose()
  @ApiProperty()
  commissionB: number;

  @Expose()
  @ApiProperty()
  commissionC: number;

  @Expose()
  @ApiProperty()
  tempHoldD: number;
}
