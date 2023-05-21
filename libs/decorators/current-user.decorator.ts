import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): string | null => {
    const req = ctx.switchToHttp().getRequest();

    if (!req.userId) {
      return null;
    }

    return req.userId;
  },
);
