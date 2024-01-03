import { Injectable, NotAcceptableException } from '@nestjs/common';
import { TodoListRepository } from 'src/db/TodoListEntity';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  private todoItem: string[] = [];
  constructor(private readonly todoRepository: TodoListRepository) {}

  async createTodoItem() {}

  async createTodoList(body: CreateTodoDto) {
    const res = await this.todoRepository.getAllTodoList();
    const usersTodos = res.filter((item) =>
      item.users.find((i) => i === body.userId),
    );

    if (usersTodos.length >= 3) {
      throw new NotAcceptableException(
        "User with free trial can't have more than 3 todos.",
      );
    }
    await this.todoRepository.createTodoList(body);
    return true;
  }

  async deleteTodoList(todoListId: string, userId: string) {
    const res = await this.todoRepository.getAllTodoList();
    const todo = res.find((todo) => todo.id === todoListId);

    if (!todo?.users?.find((i) => i === userId)) {
      throw new NotAcceptableException("User don't have such Todo.");
    }

    return this.todoRepository.deleteTodoList(todoListId);
  }

  async getAllTodoList(userId: string) {
    const res = await this.todoRepository.getAllTodoList();
    const usersTodos = res.filter((item) =>
      item.users.find((i) => i === userId),
    );

    if (!usersTodos) {
      throw new NotAcceptableException("User don't have such Todo.");
    }

    return usersTodos;
  }

  async getTodoList(todoListId: string, userId: string) {
    const res = await this.todoRepository.getAllTodoList();
    const usersTodos = res.filter((item) =>
      item.users.find((i) => i === userId),
    );

    const item = usersTodos?.find((i) => i.id === todoListId);

    if (!item) {
      throw new NotAcceptableException("User don't have such Todo.");
    }

    return item;
  }
}
