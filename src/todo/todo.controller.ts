import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';

@Controller('todo')
@UsePipes(ValidationPipe)
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  @ApiOperation({ summary: 'Create todo for particular user' })
  createTodoList(@Body() data: CreateTodoDto) {
    return this.todoService.createTodoList(data);
  }

  @Get(':todoId')
  @ApiOperation({
    summary: 'Get users todo list',
  })
  @ApiOkResponse({
    description: 'The todo record',
    type: TodoDto,
  })
  getItems(@Param('todoId') todoId: string, @Query('userId') userId: string) {
    return this.todoService.getTodoList(todoId, userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get users todo list',
  })
  @ApiOkResponse({
    description: 'The todo record',
    type: TodoDto,
    isArray: true,
  })
  getAllItems(@Query('userId') userId: string) {
    return this.todoService.getAllTodoList(userId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete todo list what belong to particular user' })
  deleteTodoList(
    @Query('todoListId') todoListId: string,
    @Query('userId') userId: string,
  ) {
    return this.todoService.deleteTodoList(todoListId, userId);
  }
}
