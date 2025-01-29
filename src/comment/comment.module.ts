// src/comment/comment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '.././product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Product]), // Add User and Product here
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}