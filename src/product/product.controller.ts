import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
import { AdminGuard } from '../user/guards/admin.guard';
import { use } from 'passport';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Add a new product (Admin only)
  @Post()
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Update a product (Admin only)
  @Put(':id')
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  // Delete a product (Admin only)
  @Delete(':id')
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  // Search products
  @Get('search')
  search(@Query() searchProductDto: SearchProductDto) {
    return this.productService.search(searchProductDto);
  }

  // Get a single product by ID
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Get()
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  findAll() {
    return this.productService.findAll();
  }

  @Post('comment/:id')
  addComment(@Param('id') id: string, @Body('comment') comment: string) {
    return this.productService.addComment(+id, comment);
  }

}

