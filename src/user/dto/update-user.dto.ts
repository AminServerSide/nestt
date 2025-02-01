import { IsString, IsEmail, IsOptional, IsInt, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string; // Optional: Updated username

  @IsOptional()
  @IsString()
  firstname?: string; // Optional: Updated first name

  @IsOptional()
  @IsString()
  lastname?: string; // Optional: Updated last name

  @IsOptional()
  @IsEmail()
  email?: string; // Optional: Updated email

  @IsOptional()
  @IsString()
  @MinLength(6) // Ensure password is at least 6 characters long
  password?: string; // Optional: Updated password

  @IsOptional()
  @IsString()
  phone?: string; // Optional: Updated phone number

  @IsOptional()
  @IsString()
  address?: string; // Optional: Updated address

  @IsOptional()
  @IsInt()
  age?: number; // Optional: Updated age

  @IsOptional()
  @IsInt()
  gender?: number; // Optional: Updated gender (0: male, 1: female)
}
