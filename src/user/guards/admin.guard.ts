import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { get } from 'node:http';

@Injectable()
@Controller('admin') // Add the @Controller decorator to define routes
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // Guard logic
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'your-secret-key', // Replace with your actual secret key
      });

      request.user = decoded; // Attach the decoded user to the request object
      return true; // Allow the request
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  // Route handlers (controller logic)
  @Get('dashboard')
  @UseGuards(AdminGuard) // Apply the guard to this route
  getDashboard() {
    return 'Welcome to the admin dashboard!';
  }

  @Get('settings')
  @UseGuards(AdminGuard) // Apply the guard to this route
  getSettings() {
    return 'Admin settings page';
  }
}

