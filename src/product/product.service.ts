import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Add a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  // Update a product
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  // Delete a product
  async remove(id: number): Promise<string> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.delete(id);
    return 'Product deleted successfully';
  }

  // Search products
  async search(searchProductDto: SearchProductDto): Promise<Product[]> {
    const { query } = searchProductDto;
    return this.productRepository
      .createQueryBuilder('product')
      .where('product.name LIKE :query OR product.description LIKE :query', { query: `%${query}%` })
      .getMany();
  }

  // Add a comment to a product
  async addComment(productId: number, comment: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.comment = comment;
    return this.productRepository.save(product);
  }

  // Find a single product by ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

   async findAll(): Promise<Product[]> {
      return this.productRepository.find();
    }
}