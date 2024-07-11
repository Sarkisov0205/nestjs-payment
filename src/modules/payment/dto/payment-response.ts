import { CreatePaymentDto } from '@/modules/payment/dto/create-payment.dto';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PAYMENT_STATUSES } from '@/modules/payment/types';

@Exclude()
export class PaymentResponse extends CreatePaymentDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  created_at: Date;
}
