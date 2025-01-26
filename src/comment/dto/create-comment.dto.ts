export class CreateCommentDto {
    readonly productId: number;
    readonly userId: number;
    readonly comment: string;
    readonly rating: number;
  }