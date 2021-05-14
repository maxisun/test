import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/models/post.model';

@ObjectType()
export class User {
  @Field(() => ID)
  userId: number;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => [Post], { nullable: 'items' })
  posts?: Post[];
}
