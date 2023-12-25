import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('todo')
export class TodoController {
  @Post()
  createItem(@Body() body: CreateItemDto): string {
    console.log(1, body);
    if (todoItem.length > 5) {
      return 'You reached maximum length of store, plz upgrade you subscription to 5$ per month';
    }
    // todoItem.push(body.name);
    return 'Success';
  }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  findAll(): any[] {
    return todoItem;
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
