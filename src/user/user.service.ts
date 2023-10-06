import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { loginDto } from './user.controller';
import { generateJwtToken } from 'src/config/generateToken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }
  async check(userData: loginDto) {
    const user = await this.userModel.findOne({ name: userData.name });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== userData.password) {
      throw new BadRequestException('password doesnot match');
    }
    const token = generateJwtToken(user);

    return { token };
  }
}
