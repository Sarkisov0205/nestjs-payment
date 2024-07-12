import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from '@/modules/store/store.module';
import { PaymentModule } from '@/modules/payment/payment.module';
import { DbModule } from '@/core/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule.forRoot(),
    StoreModule,
    PaymentModule,
  ],
})
export class AppModule {}
