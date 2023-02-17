import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Credentials {
  @Field()
  email: string;

  @Field()
  password: string;
}
