import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './schemas/User.schema';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.usersService.login(loginDto);
  }
}
