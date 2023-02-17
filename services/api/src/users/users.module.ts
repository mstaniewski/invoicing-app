import { User } from '@calovo/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CaslModule } from 'casl/casl.module';

import { UsersService } from './domain/services/users.service';

import { UsersResolver } from './interface/resolvers/users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CaslModule],
  providers: [UsersService, UsersResolver],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
