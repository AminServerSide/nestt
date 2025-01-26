import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Get the user object from the request

    // Check if the user is authenticated
    if (!user) {
      throw new UnauthorizedException('User is not authenticated');
    }

    // Check if the user has the 'admin' role
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // Throw an error if the user is not an admin
    throw new ForbiddenException('You do not have permission to access this resource');
  }
}