import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RemoveUserInput {
  @Field(() => Int)
  id: number;
}
