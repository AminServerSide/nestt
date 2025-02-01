import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string; // User's email for login

  @IsString()
  @IsNotEmpty()
  password: string; // User's password for login
}
