import { ArgsType, Field } from '@nestjs/graphql';
import { Listable } from 'shared/utility/listable';
import { FindUsersFilters } from './find-users.filters';

@ArgsType()
export class FindUsersArgs extends Listable {
  @Field(() => FindUsersFilters, { nullable: true })
  filters: FindUsersFilters;
}
