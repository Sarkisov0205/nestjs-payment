import { CreateStoreDto } from '@/modules/store/dto/create-store.dto';
import { Store } from '@/modules/store/entities/store.entity';
import { StorePayoutDto } from '@/modules/store/dto/store-payout.dto';

export interface StoreContract {
  name: string;
  commission: number;
}

export interface StoreDataAccess {
  create(createStoreDto: CreateStoreDto): Promise<string>;
  findOne(id: string): Promise<Store>;
}

export interface StorePayoutServiceContract {
  getStoreBalance(id: string): Promise<number>;
  storePayout(id: string): Promise<StorePayoutDto[]>;
}
