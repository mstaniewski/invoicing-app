import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cookieExtractor } from '../extractors/jwt-cookie.extractor';
import { UsersService } from 'users/domain/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        cookieExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('APP_SECRET'),
    });
  }

  async validate(payload: any) {
    return await this.usersService.findOneOrFail({
      where: { id: payload.sub },
    });
  }
}
