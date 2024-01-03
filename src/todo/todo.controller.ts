import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Redirect,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { HttpExceptionFilter } from 'src/Filters/http-exception.filter';
import { ValidationPipe } from 'src/Pipes/validation.pipe';
import { ValidationZodPipe } from 'src/Pipes/zod-validation.pipe';
import { TCreateItem, createItemSchema } from './dto/create-item.schema';
import { ClassValidatorValidationPipe } from 'src/Pipes/class-validator.pipe';
import { CreateItemDto } from './dto/create-item.dto';
import { AuthGuard } from 'src/Guards/auth.guard';
import { Roles } from 'src/Decorators/roles.decorator';
import { TimeoutInterceptor } from 'src/Interceptors/timeout.interceptor';

@Controller('todo')
@UseFilters(HttpExceptionFilter)
@UsePipes(ClassValidatorValidationPipe)
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  createTodoItem(@Body() body: CreateItemDto): string {
    return this.todoService.createItem(body);
  }

  @Post('zod')
  @UsePipes(new ValidationZodPipe(createItemSchema))
  createItem(@Body() body: TCreateItem): string {
    return this.todoService.createItem(body);
  }

  @Get()
  @Roles(['admin'])
  @HttpCode(HttpStatus.ACCEPTED)
  @UseInterceptors(TimeoutInterceptor)
  async findAll(): Promise<any[]> {
    await new Promise((res) => setTimeout(res, 2000));
    return this.todoService.findAll();
  }

  @Get('pipe')
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Query('id', ValidationPipe) id: number): number {
    return id;
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', HttpStatus.MOVED_PERMANENTLY)
  redirect(@Query('version') version) {
    return this.todoService.redirect(version);
  }

  @Get('error')
  error() {
    // const error = new HttpException('You are pussy!!!', HttpStatus.NOT_FOUND, {
    //   cause: 'ERROR: [Unknown keyword was passed]',
    // });
    const error = new ForbiddenException('FORBIDDEN PUSSY!!!');
    // const error = new PussyException();
    throw error;
  }
}
