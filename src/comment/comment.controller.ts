// src/comment/comment.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Create a new comment
  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  // Get a single comment by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(+id);
  }

  // Get all comments
  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  // Update a comment by ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.update(+id, updateCommentDto);
  }

  // Delete a comment by ID
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.commentService.remove(+id);
  }

  // Get all comments (for admin)
  @Get('admin/all')
  getCommentsByAdmin(): Promise<Comment[]> {
    return this.commentService.getCommentsByAdmin();
  }

  // Delete a comment by admin
  @Delete('admin/:commentId')
  deleteCommentByAdmin(@Param('commentId') commentId: string): Promise<void> {
    return this.commentService.deleteCommentByAdmin(+commentId);
  }
}