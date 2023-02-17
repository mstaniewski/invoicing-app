import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from 'users/domain/services/users.service';

@Injectable()
export class BodyFieldGuardInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const { user } = this.getRequest(context);

    const { role } = await this.usersService.findOneOrFail({
      where: { id: user.id },
      relations: { role: { permissions: true } },
    });

    // console.log(role, re);

    return next.handle().pipe(tap(() => {}));
  }

  getRequest<T = any>(context: ExecutionContext): T {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
