import { CreatePaymentDto } from '@/modules/payment/dto/create-payment.dto';
import { Payment } from '@/modules/payment/entities/payment.entity';
import { Store } from '@/modules/store/entities/store.entity';
import { PaymentBalanceEntity } from '@/modules/payment/entities/paymentBalance.entity';

export type CommissionConfigType = {
  commissionA: number;
  commissionB: number;
  tempOnHoldD: number;
};

export enum PAYMENT_STATUSES {
  new = 'new',
  processed = 'processed',
  done = 'done',
}

export interface PaymentContract {
  store: Store;
  amount: number;
}

export type GetPyOutAmountInfoI = {
  commissionAmountA: number;
  commissionAmountB: number;
  commissionAmountC: number;
  amount: number;
  totalCommission: number;
  tempOnHoldDAmount: number;
};

export type PaymentBalanceParam = {
  payment: Payment;
  commissionA: number;
  commissionB: number;
  commissionC: number;
  tempHoldD: number;
  payed: number;
  amountToPay: number;
};
export type UpdateBalanceParams = Partial<
  Pick<PaymentBalanceParam, 'tempHoldD' | 'payed'>
>;
export interface PaymentDataAccess {
  create(data: CreatePaymentDto): Promise<Payment>;
  findOne(id: string): Promise<Omit<Payment, 'store'>>;
  findOne<T extends boolean | undefined>(
    id: string,
    withRelatedEntities?: T,
  ): T extends true ? Promise<Payment> : Promise<Omit<Payment, 'store'>>;
  update(id: string, status: PAYMENT_STATUSES): Promise<void>;
}

export interface PaymentBalanceDataAccess {
  createBalance(
    balanceData: PaymentBalanceParam,
  ): Promise<PaymentBalanceEntity>;
  getPaymentBalance(paymentId: string): Promise<PaymentBalanceEntity>;
  updateBalance(id: string, data: UpdateBalanceParams): Promise<void>;
}

export interface PaymentProcessServiceContract {
  newPayment(createPaymentDto: CreatePaymentDto): Promise<string>;
  setToProcessed(ids: string[]): Promise<void>;
  setToDone(ids: string[]): Promise<void>;
}

export interface PaymentCalcServiceContract {
  getAmountOfCommission(amount: number, commissionPercentage: number): number;
  getPyOutAmountInfo(
    amount: number,
    extraCommission: number,
  ): GetPyOutAmountInfoI;
}
