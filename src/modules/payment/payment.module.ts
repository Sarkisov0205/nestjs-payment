import { Module } from '@nestjs/common';
import { PaymentService } from './data/payment.service';
import { PaymentController } from './payment.controller';
import { PaymentProcessService } from '@/modules/payment/services/paymentProcess.service';
import { PaymentBalanceService } from '@/modules/payment/data/paymentBalance.service';
import { CommissionConfig } from '@/modules/payment/constant';
import { ConfigService } from '@nestjs/config';
import { PaymentCalcService } from '@/modules/payment/services/paymentCalc.service';

@Module({
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentBalanceService,
    PaymentProcessService,
    PaymentCalcService,
    {
      provide: CommissionConfig,
      useFactory: (configService: ConfigService) => {
        const commissionA = parseInt(configService.getOrThrow('COMMISSION_A'));
        const commissionB = parseFloat(
          configService.getOrThrow('COMMISSION_B'),
        );
        const tempOnHoldD = parseFloat(
          configService.getOrThrow('TEMP_ON_HOLD_D'),
        );
        return {
          commissionA,
          commissionB,
          tempOnHoldD,
        };
      },
      inject: [ConfigService],
    },
  ],
  exports: [PaymentBalanceService, PaymentService],
})
export class PaymentModule {}
