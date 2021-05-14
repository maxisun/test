import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { LoginResolver } from './identity.resolver';
import { IdentityService } from './identity.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({ secret: 'lolis' }),
    UsersModule,
    PassportModule,
  ],
  providers: [IdentityService, JwtStrategy, LoginResolver],
})
export class IdentityModule {}
