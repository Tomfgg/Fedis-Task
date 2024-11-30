import { Model } from 'mongoose';
import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) { }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto
    let exist = await this.userModel.findOne({ email })
    if (exist) throw new ConflictException('Email already exists');
    const hashedPassword = await bcrypt.hash(password, 10)
    const createduser = await this.userModel.create({ email, 'password': hashedPassword, role });
    createduser.password = undefined
    return createduser;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto
    const user = await this.userModel.findOne({ email }).select('+password')
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid Credientials');
    }
    const payload = { id: user._id };
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const token = this.jwtService.sign(payload, { secret: jwtSecret, expiresIn: '1d' });
    return { token };
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}
