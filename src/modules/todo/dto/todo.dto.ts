import { ApiProperty } from '@nestjs/swagger';
import { TodoItemDto } from './todo-item.dto';

export class TodoDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty({ type: TodoItemDto, isArray: true })
  items: TodoItemDto[];

  @ApiProperty()
  users: string[];
}
