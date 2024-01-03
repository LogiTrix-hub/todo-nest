import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    type: String,
    example: 'Todo name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @ApiProperty({
    type: String,
    example: '43ee1682-1abd-4ca7-8d54-bd3e1d6df5da',
  })
  @IsUUID()
  userId: string;
}
