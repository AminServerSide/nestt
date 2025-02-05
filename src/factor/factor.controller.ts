import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { FactorService } from './factor.service';
import { CreateFactorDto } from './dto/create-factor.dto';
import { UpdateFactorStatusDto } from './dto/update-factor-status.dto';
import { ApplyDiscountDto } from './dto/apply-discount.dto';
import { CheckoutFactorDto } from './dto/checkout-factor.dto';
import { Factor } from './entities/factor.entity';

@Controller('factors')
export class FactorController {
  constructor(private readonly factorService: FactorService) {}

  @Post()
  async createFactor(@Body() createFactorDto: CreateFactorDto): Promise<Factor> {
    return this.factorService.createFactor(createFactorDto);
  }

  @Get('user/:userId')
  async getUserFactors(@Param('userId') userId: string): Promise<Factor[]> {
    return this.factorService.getUserFactors(userId);
  }

  @Get(':id')
  async getFactorById(@Param('id') id: string): Promise<Factor> {
    return this.factorService.getFactorById(id);
  }

  @Put(':id/status')
  async updateFactorStatus(
    @Param('id') id: string,
    @Body() updateFactorStatusDto: UpdateFactorStatusDto,
  ): Promise<Factor> {
    return this.factorService.updateFactorStatus(id, updateFactorStatusDto.status);
  }

  @Post(':id/discount')
  async applyDiscount(
    @Param('id') id: string,
    @Body() applyDiscountDto: ApplyDiscountDto,
  ): Promise<Factor> {
    return this.factorService.applyDiscount(id, applyDiscountDto.discountCode);
  }

  @Post(':id/checkout')
  async checkoutFactor(
    @Param('id') id: string,
    @Body() checkoutFactorDto: CheckoutFactorDto,
  ): Promise<Factor> {
    return this.factorService.checkoutFactor(id, checkoutFactorDto.paymentMethod);
  }

  @Delete(':id')
  async deleteFactor(@Param('id') id: string): Promise<void> {
    return this.factorService.deleteFactor(id);
  }
}