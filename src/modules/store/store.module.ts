import { Module } from '@nestjs/common';
import { StoreService } from './data/store.service';
import { StoreController } from './store.controller';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
