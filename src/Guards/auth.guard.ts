import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/Decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowedRoles = this.reflector.get(Roles, context.getHandler());
    if (!allowedRoles?.length) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    return this.matchRoles(req?.user?.role, allowedRoles);
  }

  private matchRoles(incomingRole: string, availableRoles: string[]) {
    return availableRoles.some((role) => role === incomingRole);
  }
}
