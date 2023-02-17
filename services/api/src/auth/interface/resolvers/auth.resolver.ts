import { User } from '@netm8/common';
import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from 'auth/domain/services/auth.service';
import { GqlAuthGuard } from 'auth/infrastructure/guards/gql-auth.guard';
import { LocalAuthGuard } from 'auth/infrastructure/guards/local-auth.guard';
import { SignInInput } from 'bauth/interface/dto/sign-in.input';
import { Response } from 'express';
import { Cookies } from 'shared/decorators/cookies.decorator';

import { AuthTokens } from '../dto/auth-tokens.type';

@Resolver(() => AuthTokens)
export class AuthResolver {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async whoAmI(@Cookies() cookies: Record<string, string>) {
    const { access_token } = cookies;
    return await this.authService.whoAmI(access_token);
  }

  @Mutation(() => AuthTokens)
  async signIn(
    @Args('data', { nullable: false }) data: SignInInput,
    @Context() ctx: { res: Response; req: Request },
  ) {
    const { res } = ctx;

    const [tokens, user] = await this.authService.signIn({
      email: data.email,
      password: data.password,
    });

    res.cookie('access_token', tokens.accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      httpOnly: false,
      domain: this.configService.get<string>('APP_DOMAIN'),
    });

    res.cookie('account_id', user.account.id, {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      httpOnly: false,
      domain: this.configService.get<string>('APP_DOMAIN'),
    });

    // res.cookie('refresh_token', result.refreshToken, {
    //   maxAge: 1000 * 60 * 60 * 24 * 365,
    //   secure: true,
    //   httpOnly: true,
    //   signed: true,
    //   domain: this.configService.get<string>('APP_DOMAIN'),
    // });

    return tokens;
  }

  // @Mutation(() => AuthTokens)
  // async refreshToken() {
  //   return {};
  // }
}
