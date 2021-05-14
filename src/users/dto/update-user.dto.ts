import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserDto) {
  @Field(() => Int, { description: 'the userId to update' })
  @IsNumber()
  @Min(1)
  userId: number;
}
