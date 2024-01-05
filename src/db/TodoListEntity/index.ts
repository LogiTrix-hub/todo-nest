import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FSService } from 'src/services/fsService';
import { CreateTodoDto } from 'src/modules/todo/dto/create-todo.dto';
import { TodoDto } from 'src/modules/todo/dto/todo.dto';
import { CreateItemDto } from 'src/modules/todo/dto/request/todo-item';
import { UserDto } from 'src/modules/user/dto/response/user.dto';

const PATH_TO_DB = './db/todo.json';

@Injectable()
export class TodoListRepository {
  constructor(private readonly fsService: FSService) {}

  async createTodoItem(todoId: string, body: CreateItemDto) {
    const todoList = await this.getAllTodoList();
    const updatedTodoList = todoList.map((item) => {
      if (item.id !== todoId) {
        return item;
      }
      return {
        ...item,
        items: [
          ...item.items,
          {
            name: body.name,
            checked: body.checked,
            id: uuidv4(),
          },
        ],
      };
    });

    return this.fsService.writeFile(
      resolve(PATH_TO_DB),
      JSON.stringify(updatedTodoList),
    );
  }

  async updateTodoItem(todoId: string, itemId: string, body: CreateItemDto) {
    const todoList = await this.getAllTodoList();

    const updatedTodoList = todoList.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }
      return {
        ...todo,
        items: todo.items.map((todoItem) => {
          if (todoItem.id !== itemId) {
            return todoItem;
          }
          return {
            ...todoItem,
            name: body.name,
            checked: body.checked,
          };
        }),
      };
    });

    return this.fsService.writeFile(
      resolve(PATH_TO_DB),
      JSON.stringify(updatedTodoList),
    );
  }

  async deleteTodoItem(todoId: string, itemId: string) {
    const todoList = await this.getAllTodoList();
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }
      return {
        ...todo,
        items: todo.items.filter((todoItem) => todoItem.id !== itemId),
      };
    });

    return this.fsService.writeFile(
      resolve(PATH_TO_DB),
      JSON.stringify(updatedTodoList),
    );
  }

  async createTodoList(body: CreateTodoDto, user: UserDto) {
    const todo = {
      id: uuidv4(),
      name: body.name,
      users: [user.id],
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
