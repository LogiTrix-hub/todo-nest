import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AuthenticationDto } from './dto/request/auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from '../user/dto/response/user.dto';

@Controller('auth')
@ApiTags('Auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Sign in authentication' })
  signIn(@Body() body: AuthenticationDto) {
    return this.authService.signIn(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'Sign up authentication' })
  signUp(@Body() body: AuthenticationDto) {
    return this.authService.signUp(body);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get authenticated user' })
  profile(@User() user) {
    return user as UserDto;
  }
}
