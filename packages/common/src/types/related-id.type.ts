import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RelatedId {
  @Field(() => Int)
  id: number;
}
