import { CreatePaymentDto } from '@/modules/payment/dto/create-payment.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PAYMENT_STATUSES } from '@/modules/payment/types';
import { PaymentBalanceResponseDto } from '@/modules/payment/dto/paymentBalance-response.dto';

@Exclude()
export class PaymentResponse extends CreatePaymentDto {
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
  @Type(() => PaymentBalanceResponseDto)
  paymentBalance;
}
