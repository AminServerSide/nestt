import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { log } from 'node:console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService, // Inject JwtService
  ) {}
  
  // Hash a password
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    return bcrypt.hash(password, saltRounds);
  }

  // Compare a password with its hash
  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Register a new user
  async register(userData: Partial<User>): Promise<User> {
    const hashedPassword = await this.hashPassword(userData.password); // Hash the password
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword, // Save the hashed password
    });

    // Set role to ADMIN if username is 'admin'
    if (user.username === 'admin') {
      user.role = UserRole.ADMIN; // Use the enum value
    }

    return this.userRepository.save(user);
  }

  // Login a user and generate an access token
  async login(email: string, password: string): Promise<{ accessToken: string, userId: number }> {
    const user = await this.userRepository.findOne({ where: { email } });
    console.log(await this.comparePassword(password, user.password));
    if (user && (await this.comparePassword(password, user.password))) {
      const payload = { userId: user.id, role: user.role , userEmail: user.email  }; // Token payload
      const accessToken = this.jwtService.sign(payload); // Generate JWT token
      console.log(accessToken)
      user.accessToken = accessToken; // Store the token in the database
      console.log(user)
      await this.userRepository.save(user); // Save the updated user
      return { accessToken, userId: user.id }; // Return the token and user ID
    }
    throw new UnauthorizedException('Invalid email or password'); // Throw error if login fails
  }

  // Logout a user by clearing the access token
  async logout(userId: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    user.accessToken = null; // Clear the access token
    await this.userRepository.save(user); // Save the updated user
    return 'Logged out successfully';
  }

  // Edit a user's profile
  async editProfile(userId: number, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Hash the new password if it's provided
    if (updateData.password) {
      updateData.password = await this.hashPassword(updateData.password);
    }

    // Update the user's information
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  // Reset a user's password
  async resetPassword(userId: number, oldPassword: string, newPassword: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user && (await this.comparePassword(oldPassword, user.password))) {
      user.password = await this.hashPassword(newPassword); // Hash the new password
      await this.userRepository.save(user);
      return 'Password reset successfully';
    }
    return 'Password reset failed';
  }

  // Forgot password functionality
  async forgotPassword(email: string, verificationCode: string, newPassword: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      user.password = await this.hashPassword(newPassword); // Hash the new password
      await this.userRepository.save(user);
      return 'Password updated successfully';
    }
    return 'Password update failed';
  }

  // Admin: Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Admin: Delete a user by ID
  async deleteUser(userId: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(userId);
    return 'User deleted successfully';
  }

  // Admin: Update any user's information
  async updateUserByAdmin(userId: number, updateData: Partial<User>): Promise<User> {
    if (updateData.password) {
      updateData.password = await this.hashPassword(updateData.password); // Hash the new password
    }
    await this.userRepository.update(userId, updateData);
    return this.userRepository.findOne({ where: { id: userId } });
  }
}