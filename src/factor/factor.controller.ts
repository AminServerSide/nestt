// src/factor/factor.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { FactorService } from './factor.service';
  import { CreateFactorDto } from './dto/create-factor.dto';
  import { UpdateFactorDto } from './dto/update-factor.dto';
  
  @Controller('factors')
  export class FactorController {
    constructor(private readonly factorService: FactorService) {}
  
    // Create a new factor
    @Post()
    create(@Body() createFactorDto: CreateFactorDto) {
      return this.factorService.create(createFactorDto);
    }

    @Post(':userId/:cartId')
    async createFactor(
      @Param('userId') userId: number,
      @Param('cartId') cartId: number,
    ): Promise<Factor> {
      return this.factorService.createFactor(userId, cartId);
    }
  
    // Get a single factor by ID
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.factorService.findOne(+id);
    }
  
    // Get all factors
    @Get()
    findAll() {
      return this.factorService.findAll();
    }
  
    // Update a factor by ID
    @Put(':id')
    update(@Param('id') id: string, @Body() updateFactorDto: UpdateFactorDto) {
      return this.factorService.update(+id, updateFactorDto);
    }
  
    // Delete a factor by ID
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.factorService.remove(+id);
    }
  
    // Approve a factor by ID
    @Post(':id/approve')
    approveFactor(@Param('id') id: string) {
      return this.factorService.approveFactor(+id);
    }
  }