import { Injectable, NotAcceptableException } from '@nestjs/common';
import { TodoListRepository } from 'src/db/TodoListEntity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { CreateItemDto } from './dto/request/todo-item';
import { UserDto } from '../user/dto/response/user.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoListRepository) {}

  private async _getUsersTodoLists(userId: string) {
    const res = await this.todoRepository.getAllTodoList();
    const usersTodos = res.filter((item) =>
      item.users.find((i) => i === userId),
    );

    return usersTodos;
  }

  async createTodoItem(todoId: string, body: CreateItemDto, user: UserDto) {
    const usersTodos = await this._getUsersTodoLists(user.id);

    const item = usersTodos?.find((i) => i.id === todoId);

    if (!item) {
      throw new NotAcceptableException("UserDto don't have such Todo.");
    }

    await this.todoRepository.createTodoItem(todoId, body);
    return true;
  }

  async updateTodoItem(
    todoId: string,
    itemId: string,
    body: CreateItemDto,
    user: UserDto,
  ) {
    const usersTodos = await this._getUsersTodoLists(user.id);

    const item = usersTodos?.find((i) => i.id === todoId);

    if (!item) {
      throw new NotAcceptableException("UserDto don't have such Todo.");
    }

    if (!item.items.some((i) => i.id === itemId)) {
      throw new NotAcceptableException(
        'No such todo item with provided itemId.',
      );
    }

    await this.todoRepository.updateTodoItem(todoId, itemId, body);
    return true;
  }

  async deleteTodoItem(todoId: string, itemId: string, user: UserDto) {
    const usersTodos = await this._getUsersTodoLists(user.id);

    const item = usersTodos?.find((i) => i.id === todoId);

    if (!item) {
      throw new NotAcceptableException("UserDto don't have such Todo.");
    }

    if (!item.items.some((i) => i.id === itemId)) {
      throw new NotAcceptableException(
        'No such todo item with provided itemId.',
      );
    }

    await this.todoRepository.deleteTodoItem(todoId, itemId);
    return true;
  }

  async createTodoList(body: CreateTodoDto, user: UserDto) {
    const usersTodos = await this._getUsersTodoLists(user.id);

    if (usersTodos.length >= 3) {
      throw new NotAcceptableException(
        "User with free trial can't have more than 3 todos.",
      );
    }
    await this.todoRepository.createTodoList(body, user);
    return true;
  }

  async getAllTodoList(userId: string): Promise<TodoDto[]> {
    const usersTodos = await this._getUsersTodoLists(userId);

    if (!usersTodos || !usersTodos.length) {
      throw new NotAcceptableException("UserDto don't have such Todo.");
    }

    return usersTodos;
  }

  async getTodoList(todoListId: string, userId: string) {
    const usersTodos = await this._getUsersTodoLists(userId);

    const item = usersTodos?.find((i) => i.id === todoListId);

    if (!item) {
      throw new NotAcceptableException("UserDto don't have such Todo.");
    }

    return item;
  }

  async deleteTodoList(todoListId: string, userId: string) {
    const usersTodos = await this._getUsersTodoLists(userId);

    const item = usersTodos?.find((i) => i.id === todoListId);

    if (!item) {
      throw new NotAcceptableException("UserDto don't have such Todo.");
    }

    return this.todoRepository.deleteTodoList(todoListId);
  }
}
