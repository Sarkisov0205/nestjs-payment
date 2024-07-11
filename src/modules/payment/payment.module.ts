import { Module } from '@nestjs/common';
import { PaymentService } from './data/payment.service';
import { PaymentController } from './payment.controller';
import { PaymentProcessService } from '@/modules/payment/services/paymentProcess.service';
import { PaymentTransactionService } from '@/modules/payment/data/paymentTransaction.service';
import { CommissionConfig } from '@/modules/payment/constant';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentProcessService,
    PaymentTransactionService,
    PaymentProcessService,
    {
      provide: CommissionConfig,
      useFactory: (configService: ConfigService) => {
        const commissionA = configService.getOrThrow('COMMISSION_A');
        const commissionB = configService.getOrThrow('COMMISSION_B');
        const tempOnHoldD = configService.getOrThrow('TEMP_ON_HOLD_D');
        return {
          commissionA,
          commissionB,
          tempOnHoldD,
        };
      },
      inject: [ConfigService],
    },
  ],
})
export class PaymentModule {}
