import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field()
  @IsOptional()
  @IsString()
  lastName?: string;
}
