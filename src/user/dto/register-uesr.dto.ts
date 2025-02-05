import { IsString, IsEmail, MinLength, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity'; // Import the UserRole enum

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

  @IsEnum(UserRole)
  @IsOptional() // Role is optional during registration, defaults to 'user'
  role?: UserRole;
}
