import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AccountsService } from 'accounts/domain/services/accounts.service';
import { UsersService } from 'users/domain/services/users.service';

export enum SystemRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  MODERATOR = 'moderator',
  USER = 'user',
}

export const BodyFieldsGuard = (
  fields: string[],
  role: SystemRole | SystemRole[],
) => {
  @Injectable()
  class BodyFieldsGuardMixin implements CanActivate {
    constructor(
      readonly accountsService: AccountsService,
      readonly usersService: UsersService,
      readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context);
      const req = ctx.getArgByIndex(2).req;

      const user = await this.usersService.findOne({
        where: { id: req.user.id },
        relations: { role: true },
      });

      const hasRequiredRole = Array.isArray(role)
        ? role.includes(user.role.name as SystemRole)
        : user.role.name === role;

      const protectedFieldsInBody = fields.some((field) =>
        req.body.variables.hasOwnProperty(field),
      );

      console.log(hasRequiredRole, protectedFieldsInBody);

      let isAllowed = false;

      if (hasRequiredRole) {
        isAllowed = true;
      } else if (!hasRequiredRole && protectedFieldsInBody) {
        isAllowed = false;
      } else if (!hasRequiredRole && !protectedFieldsInBody) {
        isAllowed = true;
      }

      console.log(isAllowed);
      if (!isAllowed) {
        return false;
      }
      // console.log(req.body);
      return true;
    }
  }

  return BodyFieldsGuardMixin;
};
