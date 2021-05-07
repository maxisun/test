import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { PostEntity } from '../posts/entities/post.entity';
import { PostsService } from '../posts/posts.service';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => User, { name: 'user' })
  public async getUser(
    @Args('userId', {
      type: () => Int,
      description: 'it returns a user based on its id',
    })
    userId: number,
  ): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @ResolveField()
  public async posts(@Parent() user: User): Promise<PostEntity[]> {
    const { userId } = user;
    return this.postsService.findManyPosts({ where: { userId } });
  }
}
