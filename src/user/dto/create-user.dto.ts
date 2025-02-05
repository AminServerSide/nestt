export class CreateUserDto {
  username: string; // User's username
  firstname: string; // User's first name
  lastname: string; // User's last name
  email: string; // User's email
  password: string; // User's password
  phone?: string; // Optional: User's phone number
  address?: string; // Optional: User's address
  age?: number; // Optional: User's age
  gender?: number; // Optional: User's gender (0: male, 1: female)
}