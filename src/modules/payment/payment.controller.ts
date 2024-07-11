import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { PaymentService } from './data/payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentResponse } from '@/modules/payment/dto/payment-response';
import { plainToInstance } from 'class-transformer';
import { PaymentSetStatusParamsDto } from '@/modules/payment/dto/payment-setStatus-params.dto';
import { PaymentProcessService } from '@/modules/payment/services/paymentProcess.service';
import { PaymentTransactionResponseDto } from '@/modules/payment/dto/paymentTransaction-response.dto';
import { PaymentTransactionService } from '@/modules/payment/data/paymentTransaction.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private paymentProcessService: PaymentProcessService,
    private paymentTransactionService: PaymentTransactionService,
  ) {}

  @Post()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Return id of created payment',
    type: String,
  })
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const entity = await this.paymentService.create(createPaymentDto);
    await this.paymentProcessService.setNewStatus(entity);
    return entity.id;
  }

  @Patch('processed')
  @HttpCode(200)
  @ApiResponse({
    status: 201,
    description: 'Set payments status to processed',
  })
  async setToProcessed(
    @Body() { ids }: PaymentSetStatusParamsDto,
  ): Promise<void> {
    await this.paymentProcessService.setToProcessed(ids);
  }

  @Patch('done')
  @HttpCode(200)
  @ApiResponse({
    status: 201,
    description: 'Set payments status to done',
  })
  async setToDone(@Body() { ids }: PaymentSetStatusParamsDto): Promise<void> {
    await this.paymentProcessService.setToDone(ids);
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return payment entity',
    type: PaymentResponse,
  })
  async findOne(@Param('id') id: string): Promise<PaymentResponse> {
    return plainToInstance(PaymentResponse, this.paymentService.findOne(id));
  }

  @Get(':id/transaction')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return payment transaction history',
    type: PaymentTransactionResponseDto,
    isArray: true,
  })
  async getPaymentTransaction(
    @Param('id') id: string,
  ): Promise<PaymentTransactionResponseDto[]> {
    return plainToInstance(
      PaymentTransactionResponseDto,
      await this.paymentTransactionService.getPaymentTransactions(id),
    );
  }
}
