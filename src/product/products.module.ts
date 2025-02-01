import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminGuard } from 'src/user/guards/admin.guard';


@Module({
  imports: [TypeOrmModule.forFeature([Product]),JwtModule.register({ secret: 'your-secret-key' })],
  controllers: [ProductController,AdminGuard],
  providers: [ProductService,AdminGuard],
})
export class ProductModule {}