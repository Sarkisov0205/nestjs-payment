import { CreatePaymentDto } from '@/modules/payment/dto/create-payment.dto';
import { Payment } from '@/modules/payment/entities/payment.entity';
import { Store } from '@/modules/store/entities/store.entity';
import { PaymentTransactionsEntity } from '@/modules/payment/entities/paymentTransactions.entity';

export type CommissionConfigType = {
  commissionA: number;
  commissionB: number;
  tempOnHoldD: number;
};

export enum PAYMENT_STATUSES {
  new = 'new',
  processed = 'processed',
  done = 'done',
  paidOut = 'paidOut',
}

export interface PaymentContract {
  store: Store;
  amount: number;
}

export interface PaymentDataAccess {
  create(data: CreatePaymentDto): Promise<Payment>;
  findOne(id: string): Promise<Omit<Payment, 'store'>>;
  findOne<T extends boolean | undefined>(
    id: string,
    withRelatedEntities?: T,
  ): T extends true ? Promise<Payment> : Promise<Omit<Payment, 'store'>>;
}

export interface PaymentTransactionDataAccess {
  createTransaction(
    payment: Payment,
    status: PAYMENT_STATUSES,
  ): Promise<PaymentTransactionsEntity>;
  getPaymentTransactions(
    paymentId: string,
  ): Promise<PaymentTransactionsEntity[]>;
}

export interface PaymentProcessService {
  setToProcessed(ids: string[]): Promise<void>;
  setToDone(ids: string[]): Promise<void>;
}
