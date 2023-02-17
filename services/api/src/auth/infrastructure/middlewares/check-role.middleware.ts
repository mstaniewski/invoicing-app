import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import {
  FieldMiddleware,
  GqlExecutionContext,
  MiddlewareContext,
  NextFn,
} from '@nestjs/graphql';

export const checkRoleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const { info } = ctx;
  console.log('eloooo');
  console.log(info.fieldName);
  console.log(info.parentType.getFields());
  const { extensions } = info.parentType.getFields()[info.fieldName];

  console.log(ctx);
  console.log(extensions);
  /**
   * In a real-world application, the "userRole" variable
   * should represent the caller's (user) role (for example, "ctx.user.role").
   */

  // if (userRole === extensions.role) {
  //   // or just "return null" to ignore
  //   throw new ForbiddenException(
  //     `User does not have sufficient permissions to access "${info.fieldName}" field.`,
  //   );
  // }
  return next();
};

const getRequest = (context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req;
};
