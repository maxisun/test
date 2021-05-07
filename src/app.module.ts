import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    GraphQLModule.forRoot({
      // es el path donde iran a parar mis schemas generados
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // in memory
      // autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
