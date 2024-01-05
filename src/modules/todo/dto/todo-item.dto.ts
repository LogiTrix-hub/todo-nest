import { ApiProperty } from '@nestjs/swagger';

export class TodoItemDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  checked: boolean;
}
