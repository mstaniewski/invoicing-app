import { Role } from '@netm8/common';
import { Query, Resolver } from '@nestjs/graphql';
import { RolesService } from 'casl/domain/services/roles.service';

@Resolver((of) => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [Role])
  async roles() {
    return await this.rolesService.findAll();
  }
}
