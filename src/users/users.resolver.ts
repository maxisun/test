import { Inject, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { JwtGuard } from '../identity/guards/jwt.guard';
import { PostEntity } from '../posts/entities/post.entity';
import { Post } from '../posts/models/post.model';
import { PostsService } from '../posts/posts.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { PUB_SUB } from '../pub-sub/pub-sub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';

const USER_CREATED_EVENT = 'user_created';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    @Inject(PUB_SUB)
    private readonly pubSub: RedisPubSub,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => User, { name: 'user' })
  public async getUser(
    @Args('userId', {
      type: () => Int,
      description: 'returns a user based on its id',
    })
    userId: number,
  ): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @ResolveField('posts', () => [Post])
  public async getPosts(@Parent() user: User): Promise<PostEntity[]> {
    const { userId } = user;
    return this.postsService.findManyPosts({ where: { userId } });
  }

  @Subscription(() => User)
  public userCreated() {
    return this.pubSub.asyncIterator(USER_CREATED_EVENT);
  }

  @Mutation(() => User)
  public async createUser(
    @Args('createUser') createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    const persistedUser = await this.usersService.createUser(createUserDto);
    this.pubSub.publish(USER_CREATED_EVENT, {
      userCreated: persistedUser,
    });

    return persistedUser;
  }

  @UseGuards(JwtGuard)
  @Query(() => [User], { name: 'users' })
  public async getAllUsers(): Promise<UserEntity[]> {
    return this.usersService.getAllUsers();
  }

  @Mutation(() => User)
  public async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.updateUser(updateUserInput);
  }
}
