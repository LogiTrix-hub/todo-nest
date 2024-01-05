import { BadRequestException, Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FSService } from 'src/services/fsService';
import { UserDto } from 'src/modules/user/dto/response/user.dto';

const PATH_TO_DB = './db/user.json';

@Injectable()
export class UserRepository {
  constructor(private readonly fsService: FSService) {}

  async getAllUsers(): Promise<UserDto[]> {
    return JSON.parse(await this.fsService.readFile(resolve(PATH_TO_DB)));
  }

  async getOneUserById(userId: string): Promise<UserDto> {
    const users = JSON.parse(
      await this.fsService.readFile(resolve(PATH_TO_DB)),
    );
    return users.find((i) => i.id === userId);
  }

  async getOneUserByEmail(email: string): Promise<UserDto> {
    const users = JSON.parse(
      await this.fsService.readFile(resolve(PATH_TO_DB)),
    ) as UserDto[];

    return users.find((i) => i.email.toLowerCase() === email.toLowerCase());
  }

  async createUser(body: Omit<UserDto, 'id'>) {
    const user = await this.getOneUserByEmail(body.email);
    if (user) {
      throw new BadRequestException('User with this email already exist');
    }
    try {
      const data = await this.getAllUsers();
      const newUser = {
        ...body,
        id: uuidv4(),
      };
      data.push(newUser);
      await this.fsService.writeFile(resolve(PATH_TO_DB), JSON.stringify(data));
      return newUser;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
