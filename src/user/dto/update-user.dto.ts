export class UpdateUserDto {
    username?: string; // Optional: Updated username
    firstname?: string; // Optional: Updated first name
    lastname?: string; // Optional: Updated last name
    email?: string; // Optional: Updated email
    password?: string; // Optional: Updated password
    phone?: string; // Optional: Updated phone number
    address?: string; // Optional: Updated address
    age?: number; // Optional: Updated age
    gender?: number; // Optional: Updated gender (0: male, 1: female)
  }