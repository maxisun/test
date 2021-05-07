import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => Int)
  postId: number;

  @Field({ nullable: false })
  title: string;

  @Field(() => Int, { nullable: true })
  votes?: number;
}
