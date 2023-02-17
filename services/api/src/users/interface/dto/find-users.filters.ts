import { Field, InputType } from '@nestjs/graphql';
import { FilterableField } from 'shared/types/filterable-field';

@InputType()
export class FindUsersFilters {
  @Field(() => FilterableField, { nullable: true })
  email: FilterableField;

  @Field(() => FilterableField, { nullable: true })
  firstName: FilterableField;

  @Field(() => FilterableField, { nullable: true })
  lastName: FilterableField;
}
