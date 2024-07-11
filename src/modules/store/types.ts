import { CreateStoreDto } from '@/modules/store/dto/create-store.dto';
import { Store } from '@/modules/store/entities/store.entity';
import { UpdateStoreDto } from '@/modules/store/dto/update-store.dto';

export interface StoreContract {
  name: string;
  commission: number;
}

export interface StoreDataAccess {
  create(createStoreDto: CreateStoreDto): Promise<string>;
  findOne(id: string): Promise<Store>;
  update(id: string, updateStoreDto: UpdateStoreDto): Promise<void>;
}
