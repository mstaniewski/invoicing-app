import { Module } from '@nestjs/common';
import { Account, Plan } from '@netm8/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

import { AuthService } from './domain/services/auth.service';

import { RefreshToken } from './infrastructure/entities/refresh-token.entity';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { LocalStrategy } from './infrastructure/strategies/local.strategy';
import { AuthResolver } from './interface/resolvers/auth.resolver';
import { UsersEventsListener } from './infrastructure/listeners/users-events.listener';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, RefreshToken, Plan]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('APP_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_EXPIRE_TIME'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    UsersEventsListener,
  ],
  exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}
