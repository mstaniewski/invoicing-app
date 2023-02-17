import { Field, InputType } from '@nestjs/graphql';
import { RelatedId } from '../types/related-id.type';


@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => RelatedId)
  role: RelatedId;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field(() => RelatedId, {nullable: true})
  avatar: RelatedId
}
