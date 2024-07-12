import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoreResponseDto } from '@/modules/store/dto/store-response.dto';
import { plainToInstance } from 'class-transformer';
import { StoreService } from '@/modules/store/data/store.service';
import { StorePayoutService } from '@/modules/store/services/storePayout.service';
import { StorePayoutDto } from '@/modules/store/dto/store-payout.dto';

@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly storePayoutService: StorePayoutService,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Return id of created store',
    type: String,
  })
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return store entity',
    type: StoreResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<StoreResponseDto> {
    return plainToInstance(
      StoreResponseDto,
      await this.storeService.findOne(id),
    );
  }

  @Get(':id/balance')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Get balance for current store',
    type: StoreResponseDto,
  })
  getStoreBalance(@Param('id') id: string) {
    return this.storePayoutService.getStoreBalance(id);
  }

  @Get(':id/payout')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Do payout for current store',
    type: StorePayoutDto,
    isArray: true,
  })
  storePayout(@Param('id') id: string) {
    return plainToInstance(
      StorePayoutDto,
      this.storePayoutService.storePayout(id),
    );
  }
}
