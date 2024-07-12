import { Module } from '@nestjs/common';
import { StoreService } from './data/store.service';
import { StoreController } from './store.controller';
import { StorePayoutService } from '@/modules/store/services/storePayout.service';
import { PaymentModule } from '@/modules/payment/payment.module';

@Module({
  controllers: [StoreController],
  imports: [PaymentModule],
  providers: [StoreService, StorePayoutService],
})
export class StoreModule {}
