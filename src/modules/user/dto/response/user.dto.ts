import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: String,
    example: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'email@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  firstName?: string;

  @ApiProperty({
    type: String,
  })
  lastName?: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @MinLength(6)
  password?: string;
}
