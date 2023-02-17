import { Injectable } from '@nestjs/common';
import { UsersService } from 'users/domain/services/users.service';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthTokens } from 'auth/interface/dto/auth-tokens.type';
import { ACCESS_TOKEN_EXPIRY_TIME } from '../constants/jwt';
import { ConfigService } from '@nestjs/config';
import { decode } from 'jsonwebtoken';
import { Credentials } from 'auth/interface/types/credentials.type';
import { User } from '@netm8/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: Credentials): Promise<[AuthTokens, User]> {
    const user = await this.usersService.findOneOrFail({
      where: { email: credentials.email },
      relations: { account: true, role: { permissions: true } },
    });

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return [
      {
        accessToken: this.jwtService.sign(payload, {
          expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
        }),
      },
      user,
    ];
  }

  async whoAmI(token: string) {
    const { sub } = decode(token);
    return await this.usersService.findOneOrFail({
      where: { id: Number(sub) },
      relations: { role: { permissions: true } },
    });
  }

  async validateCredentials(email: string, password: string) {
    const user = await this.usersService.findOneOrFail({
      where: { email },
      relations: { role: { permissions: true } },
    });

    if (await this.comparePassword(password, user.password)) {
      return user;
    }
    return null;
  }

  private async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('APP_SECRET'),
    });
  }
}
