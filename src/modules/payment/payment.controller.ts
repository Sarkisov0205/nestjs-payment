import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './data/payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentResponse } from '@/modules/payment/dto/payment-response';
import { plainToInstance } from 'class-transformer';
import { PaymentSetStatusParamsDto } from '@/modules/payment/dto/payment-setStatus-params.dto';
import { PaymentProcessService } from '@/modules/payment/services/paymentProcess.service';
import { PaymentBalanceResponseDto } from '@/modules/payment/dto/paymentBalance-response.dto';
import { PaymentBalanceService } from '@/modules/payment/data/paymentBalance.service';
import { NewPaymentGuard } from '@/modules/payment/guards/newPayment.guard';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private paymentProcessService: PaymentProcessService,
    private paymentBalanceService: PaymentBalanceService,
  ) {}

  @Post()
  @UseGuards(NewPaymentGuard)
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Return id of created payment',
    type: String,
  })
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentProcessService.newPayment(createPaymentDto);
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

  @Get(':id/balance')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'Return payment balance',
    type: PaymentBalanceResponseDto,
  })
  async getPaymentBalance(
    @Param('id') id: string,
  ): Promise<PaymentBalanceResponseDto> {
    return plainToInstance(
      PaymentBalanceResponseDto,
      await this.paymentBalanceService.getPaymentBalance(id),
    );
  }
}
