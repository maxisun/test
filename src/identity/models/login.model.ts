import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginModel {
  @Field({ description: 'the access jwt token', nullable: false })
  accessToken: string;
}
