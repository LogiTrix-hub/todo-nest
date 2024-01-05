import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    type: String,
    example: 'Todo item name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Boolean,
    example: 'Todo item is checked',
    required: false,
  })
  @IsBoolean()
  checked: boolean;
}
