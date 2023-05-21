import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthBearerGuard implements CanActivate {
  constructor(protected jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }

    const token = req.headers.authorization.split(' ')[1];
    const tokenPayload = await this.jwt.decode(token);
    if (!tokenPayload) {
      throw new UnauthorizedException();
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.userId = tokenPayload.userId;
    return true;
  }
}
