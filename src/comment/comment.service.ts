// src/comment/comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Create a new comment
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { userId, productId, comment, rating } = createCommentDto;

    // Find the user and product
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Create the comment
    const newComment = this.commentRepository.create({
      comment,
      rating,
      user,
      product,
    });

    return await this.commentRepository.save(newComment);
  }

  // Find a single comment by ID
  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'product'], // Include user and product details
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  // Find all comments
  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find({
      relations: ['user', 'product'], // Include user and product details
    });
  }

  // Update a comment
  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Merge the updated data into the existing comment
    this.commentRepository.merge(comment, updateCommentDto);
    return await this.commentRepository.save(comment);
  }

  // Remove a comment
  async remove(id: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    await this.commentRepository.remove(comment);
  }

  // Get all comments (for admin)
  async getCommentsByAdmin(): Promise<Comment[]> {
    return await this.commentRepository.find({
      relations: ['user', 'product'], // Include user and product details
    });
  }

  // Delete a comment by admin
  async deleteCommentByAdmin(commentId: number): Promise<void> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }
    await this.commentRepository.remove(comment);
  }
}