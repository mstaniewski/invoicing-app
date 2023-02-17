import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class FindUserByIdArgs {
  @Field(() => Int)
  id: number;
}
