import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/UserEntity';
import { UserDto } from './dto/response/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string) {
    return await this.userRepository.getOneUserByEmail(email);
  }

  async createUser(body: Omit<UserDto, 'id'>) {
    return await this.userRepository.createUser(body);
  }
}
