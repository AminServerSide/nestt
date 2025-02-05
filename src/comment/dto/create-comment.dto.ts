// src/comment/dto/create-comment.dto.ts
export class CreateCommentDto {
  readonly userId: number; // ID of the user writing the comment
  readonly productId: number; // ID of the product being commented on
  readonly comment: string; // The comment text
  readonly rating: number; // The rating (e.g., 1-5)
}