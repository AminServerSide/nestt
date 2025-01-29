import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Register User entity
    JwtModule.register({ // Configure JwtModule
      secret: 'your-secret-key', // Replace with a secure secret key
      signOptions: { expiresIn: '1h' }, // Token expires in 1 hour
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, JwtModule], // Export JwtModule to make JwtService available
})
export class UserModule {}