import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from 'src/db/UserEntity';
import { FSService } from 'src/services/fsService';

@Module({
  providers: [UserService, UserRepository, FSService],
  exports: [UserService],
})
export class UserModule {}
