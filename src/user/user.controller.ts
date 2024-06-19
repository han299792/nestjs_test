import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async registerUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body.email, body.password);
  }
  
}



