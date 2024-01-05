import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthenticationDto {
  @ApiProperty({
    type: String,
    example: 'email@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: 'password',
  })
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
