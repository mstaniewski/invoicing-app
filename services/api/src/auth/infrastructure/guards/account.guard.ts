import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AccountsService } from 'accounts/domain/services/accounts.service';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private accountsService: AccountsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const { account_id: accountId } = request.cookies;

    if (!accountId) return false;

    const account = await this.accountsService.findOne({
      where: { id: accountId },
    });

    if (!account) return false;

    const isMember = await this.accountsService.isMember(
      accountId,
      request.user,
    );

    request.account = account;

    return isMember;
  }

  getRequest<T = any>(context: ExecutionContext): T {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
