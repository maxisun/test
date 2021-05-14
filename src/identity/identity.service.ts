import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login-user.dto';
import { LoginModel } from './models/login.model';

@Injectable()
export class IdentityService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginDto: LoginUserInput): Promise<LoginModel> {
    const storedUser = await this.usersService.findOneUserByConditions({
      where: { username: loginDto.username },
    });

    if (!storedUser || storedUser.password !== loginDto.password)
      throw new UnauthorizedException();

    return {
      accessToken: this.signToken(storedUser.userId),
    };
  }

  private signToken(userId: number) {
    const payload = { userId };

    return this.jwtService.sign(payload);
  }
}
