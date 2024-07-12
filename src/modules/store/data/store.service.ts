import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from '../dto/create-store.dto';
import { Store } from '@/modules/store/entities/store.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@/core/db/utils/decorators';
import { StoreDataAccess } from '@/modules/store/types';

@Injectable()
export class StoreService implements StoreDataAccess {
  private readonly logger: Logger = new Logger('Store Logger');

  constructor(@InjectRepository(Store) private repo: Repository<Store>) {}

  async create(createStoreDto: CreateStoreDto): Promise<string> {
    const model = this.repo.create(createStoreDto);
    const entity = await this.repo.save(model);
    return entity.id;
  }

  async findOne(id: string): Promise<Store> {
    return this.findOneOrFail(id);
  }

  private findOneOrFail(id: string) {
    try {
      return this.repo.findOneOrFail({ where: { id } });
    } catch (e) {
      this.throwNotFound();
    }
  }
  private throwNotFound(): never {
    this.logger.error('Store was not found');
    throw new NotFoundException('Store was not found');
  }
}
