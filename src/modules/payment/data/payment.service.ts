import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { InjectRepository } from '@/core/db/utils/decorators';
import { Payment } from '@/modules/payment/entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentDataAccess } from '@/modules/payment/types';

@Injectable()
export class PaymentService implements PaymentDataAccess {
  private readonly logger: Logger = new Logger('Store Logger');
  constructor(@InjectRepository(Payment) private repo: Repository<Payment>) {}

  async create({ store, amount }: CreatePaymentDto): Promise<Payment> {
    const model = this.repo.create({
      store: { id: store },
      amount: amount,
    });

    const payment = await this.repo.save(model);
    return this.findOneOrFail(payment.id, true);
  }

  findOne(id: string): Promise<Omit<Payment, 'store'>>;
  findOne<T extends boolean | undefined>(
    id: string,
    withRelatedEntities?: T,
  ): T extends true ? Promise<Payment> : Promise<Omit<Payment, 'store'>>;
  async findOne(
    id: string,
    withRelatedEntity = false,
  ): Promise<Payment | Omit<Payment, 'store'>> {
    return this.findOneOrFail(id, withRelatedEntity);
  }

  private findOneOrFail(
    id: string,
    withRelatedEntity = false,
  ): Promise<Payment> {
    try {
      return this.repo.findOneOrFail({
        where: { id },
        ...(withRelatedEntity && {
          relations: { store: true },
        }),
      });
    } catch (e) {
      this.throwNotFound();
    }
  }
  private throwNotFound(): never {
    this.logger.error('Payment was not found');
    throw new NotFoundException('Store was not found');
  }
}
