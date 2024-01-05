import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoListRepository } from 'src/db/TodoListEntity';
import { FSService } from 'src/services/fsService';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [FSService, TodoListRepository, TodoService],
})
export class TodoModule {}
