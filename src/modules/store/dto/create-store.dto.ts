import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StoreContract } from '@/modules/store/types';
import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

@Exclude()
export class CreateStoreDto implements StoreContract {
  @Expose()
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @Expose()
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1)
  commission: number;
}
