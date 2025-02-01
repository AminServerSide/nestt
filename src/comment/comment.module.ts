import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Product]),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your secret key
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}