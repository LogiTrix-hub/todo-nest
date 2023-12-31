import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthenticationDto } from './dto/request/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(body: AuthenticationDto) {
    const user = await this.userService.findOne(body.email);
    if (user?.password !== body.password) {
      throw new UnauthorizedException();
    }
    const payload = { ...user, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(body: AuthenticationDto) {
    const user = await this.userService.createUser(body);
    const payload = { ...user, sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
