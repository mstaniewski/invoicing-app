import { CreateUserInput, User } from '@calovo/common';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import {
  Args,
  Field,
  Info,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';

import { UsersService } from 'users/domain/services/users.service';

import { FindUserByIdArgs } from '../dto/find-user-by-id.args';
import { GraphRelationBuilder } from 'typeorm-relations-graphql';
import { DataSource, FindManyOptions } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { FindUsersArgs } from '../dto/find-users.args';
import { Pagination as PaginationType } from 'shared/types/pagination.type';
import { Pagination } from 'shared/decorators/pagination.decorator';
import { Filters } from 'shared/decorators/filters.decorator';
import { OffsetPagination } from 'shared/utility/listable';
import { FindUsersFilters } from '../dto/find-users.filters';
import { Relations } from 'shared/decorators/relations.decorator';

@ObjectType()
export class PaginatedUsersResult {
  @Field(() => PaginationType)
  pagination: PaginationType;

  @Field(() => [User])
  results: User[];
}

// @UseGuards(GqlAuthGuard)
@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Query(() => PaginatedUsersResult)
  async users(
    @Info() info,
    @Args() args: FindUsersArgs,
    @Pagination() pagination: OffsetPagination,
    @Filters() filters,
  ) {
    const relations = new GraphRelationBuilder(this.dataSource);
    const { offset, limit } = pagination;
    return await this.usersService.paginate(offset, limit, {
      relations: relations.buildForQuery(User, info).toFindOptionsRelations(),
      where: filters,
    });
  }

  @Query(() => [User])
  async typeAheadUsers(@Args('query') query: string) {
    return await this.usersService.typeAheadUsers(query);
  }

  @Query(() => User)
  async user(@Args({ nullable: false }) args: FindUserByIdArgs, @Info() info) {
    const relations = new GraphRelationBuilder(this.dataSource);

    return await this.usersService.findOneOrFail({
      where: { id: args.id },
      relations: relations.buildForQuery(User, info).toFindOptionsRelations(),
    });
  }

  @Mutation(() => User)
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies(new CreateUserPolicy())
  async createUser(@Args('data') data: CreateUserInput) {
    return await this.usersService.create(data);
  }

  // @Mutation(() => User)
  // async updateUser() {
  //   // return await this.usersService.update('', {});
  // }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    return await this.usersService.remove({ id });
  }
}
