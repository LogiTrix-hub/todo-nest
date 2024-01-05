import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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
}
