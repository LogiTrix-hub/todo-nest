import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';
import { CreateItemDto } from './dto/request/todo-item';
import { AuthGuard } from '../auth/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('todo')
@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post(':todoId/item')
  @ApiTags('Todo items')
  @ApiOperation({ summary: 'Create todo item for particular users todo' })
  @ApiOkResponse({
    description: 'The todo record',
  })
  async createTodoItem(
    @Body() data: CreateItemDto,
    @Param('todoId') todoId: string,
    @User() user,
  ) {
    return await this.todoService.createTodoItem(todoId, data, user);
  }

  @Patch(':todoId/item/:itemId')
  @ApiTags('Todo items')
  @ApiOperation({ summary: 'Update todo item for particular users todo' })
  async updateTodoItem(
    @Body() data: CreateItemDto,
    @Param('todoId') todoId: string,
    @Param('itemId') itemId: string,
    @User() user,
  ) {
    return await this.todoService.updateTodoItem(todoId, itemId, data, user);
  }

  @Delete(':todoId/item/:itemId')
  @ApiTags('Todo items')
  @ApiOperation({ summary: 'Delete todo item from particular users todo' })
  async deleteTodoItem(
    @Param('todoId') todoId: string,
    @Param('itemId') itemId: string,
    @User() user,
  ) {
    return await this.todoService.deleteTodoItem(todoId, itemId, user);
  }

  @Post()
  @ApiTags('Todo')
  @ApiOperation({ summary: 'Create todo for particular user' })
  createTodoList(@Body() data: CreateTodoDto, @User() user) {
    return this.todoService.createTodoList(data, user);
  }

  @Get(':todoId')
  @ApiTags('Todo')
  @ApiOperation({
    summary: 'Get users todo list',
  })
  @ApiOkResponse({
    description: 'The todo record',
    type: TodoDto,
  })
  getItems(@Param('todoId') todoId: string, @User() user) {
    return this.todoService.getTodoList(todoId, user.id);
  }

  @Get()
  @ApiTags('Todo')
  @ApiOperation({
    summary: 'Get users todo list',
  })
  @ApiOkResponse({
    description: 'The todo record',
    type: TodoDto,
    isArray: true,
  })
  getAllItems(@User() user): Promise<TodoDto[]> {
    return this.todoService.getAllTodoList(user.id);
  }

  @Delete()
  @ApiTags('Todo')
  @ApiOperation({ summary: 'Delete todo list what belong to particular user' })
  deleteTodoList(@Query('todoListId') todoListId: string, @User() user) {
    return this.todoService.deleteTodoList(todoListId, user.id);
  }
}
