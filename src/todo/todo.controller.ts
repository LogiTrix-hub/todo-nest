import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  Query,
  Redirect,
  UseFilters,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { TodoService } from './todo.service';
import { HttpExceptionFilter } from 'src/Filters/http-exception.filter';
import { ValidationPipe } from 'src/Pipes/validation.pipe';

@Controller('todo')
@UseFilters(HttpExceptionFilter)
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  createItem(@Body(ValidationPipe) body: CreateItemDto): string {
    return this.todoService.createItem(body);
  }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  findAll(): any[] {
    return this.todoService.findAll();
  }

  @Get('/pipe')
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Query('id', ValidationPipe) id: number): number {
    return id;
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', HttpStatus.MOVED_PERMANENTLY)
  redirect(@Query('version') version) {
    return this.todoService.redirect(version);
  }

  @Get('/error')
  error() {
    // const error = new HttpException('You are pussy!!!', HttpStatus.NOT_FOUND, {
    //   cause: 'ERROR: [Unknown keyword was passed]',
    // });
    const error = new ForbiddenException('FORBIDDEN PUSSY!!!');
    // const error = new PussyException();
    throw error;
  }
}
