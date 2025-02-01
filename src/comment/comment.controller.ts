import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AdminGuard } from '../user/guards/admin.guard';  
import { get } from 'http';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // Add a new comment
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  // Update a comment (Admin only)
  @Put(':id')
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  // Delete a comment (Admin only)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }


  
  @Get(':id')
  @UseGuards(AdminGuard)
  getCommentsByAdmin(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Delete('id')
  @UseGuards(AdminGuard)
  deleteCommentByAdmin(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }






  
}