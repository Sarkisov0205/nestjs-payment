import { CreateStoreDto } from './create-store.dto';
import { Exclude } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';

@Exclude()
export class UpdateStoreDto extends PartialType(CreateStoreDto) {}
