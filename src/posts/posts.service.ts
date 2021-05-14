import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  public async findManyPosts(
    conditions: FindManyOptions<PostEntity>,
  ): Promise<PostEntity[]> {
    return this.postsRepository.find(conditions);
  }

  public async createOnePost(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = this.postsRepository.create(createPostDto);
    const savedPost = await this.postsRepository.save(newPost);
    return plainToClass(Post, savedPost);
  }
}
