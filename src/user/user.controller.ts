import { Controller, Post, Body, Param, Put, Get, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register-uesr.dto';
import { LoginDto } from './dto/login-uesr.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { User } from './entities/user.entity';
import { AdminGuard } from './guards/admin.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register a new user
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.userService.register(registerDto);
  }

  // Login a user and return an access token
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; userId: number }> {
    return this.userService.login(loginDto.email, loginDto.password);
  }

  // Logout a user by clearing the access token
  @Post('logout/:userId')
  async logout(@Param('userId') userId: number): Promise<string> {
    return this.userService.logout(userId);
  }

  // Edit a user's profile
  @Put('edit-profile/:userId')
  async editProfile(
    @Param('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.editProfile(userId, updateUserDto);
  }

  // Reset a user's password
  @Put('reset-password/:userId')
  async resetPassword(
    @Param('userId') userId: number,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<string> {
    return this.userService.resetPassword(
      userId,
      resetPasswordDto.oldPassword,
      resetPasswordDto.newPassword,
    );
  }

  // Forgot password functionality
  @Put('forgot-password')
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<string> {
    return this.userService.forgotPassword(
      forgotPasswordDto.email,
      forgotPasswordDto.verificationCode,
      forgotPasswordDto.newPassword,
    );
  }

  // Admin: Get all users
  @Get()
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  // Admin: Delete a user by ID
  @Delete(':id')
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  async deleteUser(@Param('id') userId: number): Promise<string> {
    return this.userService.deleteUser(userId);
  }

  // Admin: Update any user's information
  @Put(':id')
  @UseGuards(AdminGuard) // Protect this route with an admin guard
  async updateUserByAdmin(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserByAdmin(userId, updateUserDto);
  }
}