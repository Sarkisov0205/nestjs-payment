import { Inject, Injectable } from '@nestjs/common';
import { DATA_SOURCE } from '@/core/db/injection-token';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@/core/db/utils/decorators';
import { Store } from '@/modules/store/entities/store.entity';
import { PAYMENT_STATUSES } from '@/modules/payment/types';
import { Payment } from '@/modules/payment/entities/payment.entity';
import { PaymentBalanceEntity } from '@/modules/payment/entities/paymentBalance.entity';
import { StorePayoutServiceContract } from '@/modules/store/types';
import { PaymentBalanceService } from '@/modules/payment/data/paymentBalance.service';
import { StorePayoutDto } from '@/modules/store/dto/store-payout.dto';

@Injectable()
export class StorePayoutService implements StorePayoutServiceContract {
  constructor(
    @Inject(DATA_SOURCE) private db: DataSource,
    @InjectRepository(Store) private repo: Repository<Store>,
    private paymentBalanceService: PaymentBalanceService,
  ) {}

  async getStoreBalance(id: string): Promise<number> {
    const store = await this.getStorePaymentToProcess(id);
    return store ? this.calcStoreBalance(store.payment) : 0;
  }

  async storePayout(id: string): Promise<StorePayoutDto[]> {
    const payments = await this.getStorePaymentInBalanceRange(id);
    const out = [];
    for (const payment of payments) {
      const payedNow = this.calcStoreBalance([payment]);

      await this.paymentBalanceService.updateBalance(
        payment.paymentBalance.id,
        { payed: payment.paymentBalance.payed + payedNow },
      );
      out.push({ paymentId: payment.id, amount: payedNow });
    }

    return out;
  }

  private calcStoreBalance(payments: Payment[]): number {
    const { fullPayment, onHoldD, payed } = payments.reduce(
      (acc, payment) => {
        acc.fullPayment += payment.paymentBalance.amountToPay;
        acc.payed += payment.paymentBalance.payed;
        acc.onHoldD += payment.paymentBalance.tempHoldD;
        return acc;
      },
      {
        fullPayment: 0,
        payed: 0,
        onHoldD: 0,
      },
    );

    return fullPayment - payed - onHoldD;
  }

  private async getStorePaymentInBalanceRange(id: string): Promise<Payment[]> {
    const store = await this.getStorePaymentToProcess(id);
    if (store) {
      let balance = this.calcStoreBalance(store.payment);
      const payment = store?.payment || [];
      //We will pay the smallest payment at first (not a good solution, but it's test work 😊)
      const sorted = payment.sort((a, b) => {
        return a.paymentBalance.amountToPay - a.paymentBalance.payed <
          b.paymentBalance.amountToPay - b.paymentBalance.payed
          ? -1
          : 1;
      });

      const paymentInBalanceRange = [];
      for (const payment of sorted) {
        const availableToPay =
          payment.paymentBalance.amountToPay -
          payment.paymentBalance.tempHoldD -
          payment.paymentBalance.payed;

        if (balance < availableToPay) break;

        balance -= availableToPay;
        paymentInBalanceRange.push(payment);
      }

      return paymentInBalanceRange;
    }
    return [];
  }
  //todo Should new payment be also add ot store balance???
  private async getStorePaymentToProcess(id: string): Promise<Store | null> {
    return await this.repo
      .createQueryBuilder('s')
      .leftJoinAndMapMany(
        's.payment',
        Payment,
        'sp',
        'sp.status != :status AND sp.store = s.id',
        { status: PAYMENT_STATUSES.new },
      )
      .leftJoinAndMapOne(
        'sp.paymentBalance',
        PaymentBalanceEntity,
        'spb',
        'spb.payment = sp.id AND spb.payed < spb.amountToPay',
      )
      .where('s.id = :id AND spb is not null', { id })
      .orderBy('sp.created_at', 'ASC')
      .getOne();
  }
}
