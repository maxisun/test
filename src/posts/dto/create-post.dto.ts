import { Field, InputType, Int } from '@nestjs/graphql';
import { IsPositive, IsString, Min } from 'class-validator';

@InputType()
export class CreatePostDto {
  @Field({ nullable: false })
  @IsString()
  title: string;

  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  votes?: number;

  @Field(() => Int, { nullable: false })
  @IsPositive()
  userId: number;
}
