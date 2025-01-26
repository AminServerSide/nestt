import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<Comment> {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.commentService.remove(+id);
  }

  @Get('product/:productId')
  getCommentsByProduct(
    @Param('productId') productId: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ): Promise<Comment[]> {
    return this.commentService.getCommentsByProduct(+productId, limit, offset);
  }

  @Delete('admin/:commentId')
  deleteCommentByAdmin(@Param('commentId') commentId: string, @Query('adminId') adminId: string): Promise<void> {
    return this.commentService.deleteCommentByAdmin(+commentId, +adminId);
  }
}