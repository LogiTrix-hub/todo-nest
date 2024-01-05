import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/UserEntity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string) {
    return await this.userRepository.getOneUserByEmail(email);
  }
}
