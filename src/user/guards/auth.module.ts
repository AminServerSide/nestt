import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from './admin.guard';

@Module({
  providers: [JwtService, AdminGuard,],
  exports: [JwtService, AdminGuard], 
})
export class AuthModule {}
