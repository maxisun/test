import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  public async createPost(
    @Args('createPostDto') createPostDto: CreatePostDto,
  ): Promise<Post> {
    return this.postsService.createOnePost(createPostDto);
  }
}
