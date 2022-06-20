import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

import { ROLES_KEY } from '../../decorators/role.decorator';
import { Role } from '../../enums/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    const hasRole = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    if (hasRole) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      const user = this.jwtService.verify(token);
      if (user.role !== 'admin') return false;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException({
          message: 'Unauthorized. Token Invalid!',
          code: 'invalid.token',
        })
      );
    }
    return user;
  }
}
