import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
} from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoreResponseDto } from '@/modules/store/dto/store-response.dto';
import { plainToInstance } from 'class-transformer';
import { StoreService } from '@/modules/store/data/store.service';

@ApiTags('Store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

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

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(id, updateStoreDto);
  }
}
