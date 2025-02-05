import { Injectable } from "@nestjs/common";
import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers["authorization"]?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("Token not found");
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: "your-secret-key",
      });


      request.user = decoded; 
      return true; 
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
