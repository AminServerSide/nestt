import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6) // Ensure password is at least 6 characters long
  @IsNotEmpty()
  password: string;

  @IsString()
  phone?: string;

  @IsString()
  address?: string;

  @IsNotEmpty()
  age?: number;

  @IsNotEmpty()
  gender?: number;
}