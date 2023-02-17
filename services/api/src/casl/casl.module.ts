import { Permission, Role } from '@netm8/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsService } from './domain/services/permissions.service';
import { RolesService } from './domain/services/roles.service';

import { CaslAbilityFactory } from './infrastructure/factories/casl-ability.factory';
import { RolesResolver } from './interface/resolvers/roles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role])],
  providers: [
    CaslAbilityFactory,
    PermissionsService,
    RolesService,
    RolesResolver,
  ],
  exports: [CaslAbilityFactory, PermissionsService, TypeOrmModule],
})
export class CaslModule {}
