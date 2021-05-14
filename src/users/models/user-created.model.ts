import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCreated {
  @Field(() => Int, { nullable: true })
  userId?: number;
}
