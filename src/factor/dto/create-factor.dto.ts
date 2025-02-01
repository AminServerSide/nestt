// src/factor/dto/create-factor.dto.ts
export class CreateFactorDto {
    readonly userId: number; // ID of the user creating the factor
    readonly cartIds: number[]; // IDs of the carts included in the factor
    readonly totalPrice: number; // Total price of the factor
  }