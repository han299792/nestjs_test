import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ConfigService, JwtService]
})
export class AuthModule {}
