import { Injectable } from '@nestjs/common';
import { FSService } from 'src/services/fsService';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto } from 'src/todo/dto/create-todo.dto';
import { TodoDto } from 'src/todo/dto/todo.dto';
import { resolve } from 'path';

const PATH_TO_DB = './db/todo.json';

@Injectable()
export class TodoListRepository {
  constructor(private readonly fsService: FSService) {}

  async createTodoList(body: CreateTodoDto) {
    const todo = {
      id: uuidv4(),
      name: body.name,
      users: [body.userId],
      items: [],
    };

    const todoList = await this.getAllTodoList();
    todoList.push(todo);

    return this.fsService.writeFile(
      resolve(PATH_TO_DB),
      JSON.stringify(todoList),
    );
  }

  async deleteTodoList(id: string) {
    const todoList = await this.getAllTodoList();
    const updatedList = todoList.filter((i) => i.id !== id);

    return this.fsService.writeFile(
      resolve(PATH_TO_DB),
      JSON.stringify(updatedList),
    );
  }

  async getAllTodoList(): Promise<TodoDto[]> {
    return JSON.parse(await this.fsService.readFile(resolve(PATH_TO_DB)));
  }
}
