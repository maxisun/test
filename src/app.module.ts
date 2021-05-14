import { Module } from '@nestjs/common';
import { GraphQLFederationModule, GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { IdentityModule } from './identity/identity.module';
import { PubSubModule } from './pub-sub/pub-sub.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    GraphQLModule.forRoot({
      // es el path donde iran a parar mis schemas generados
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      // in memory
      // autoSchemaFile: true,
    }),
    // GraphQLFederationModule.forRoot({
    //   // es el path donde iran a parar mis schemas generados
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    //   // Federation doesn't support subscriptions yet
    //   //installSubscriptionHandlers: true,
    //   // in memory
    //   // autoSchemaFile: true,
    // }),
    TypeOrmModule.forRoot(),
    UsersModule,
    PostsModule,
    IdentityModule,
    PubSubModule,
  ],
})
export class AppModule {}
