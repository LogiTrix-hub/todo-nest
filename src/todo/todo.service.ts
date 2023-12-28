import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class TodoService {
  private todoItem: string[] = [];
  createItem(body: CreateItemDto): string {
    if (this.todoItem.length > 5) {
      return 'You reached maximum length of store, plz upgrade you subscription to 5$ per month';
    }
    this.todoItem.push(body.name);
    return 'Success';
  }
  findAll(): any[] {
    return this.todoItem;
  }

  redirect(version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
