import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from './dto/login-user.dto';
import { IdentityService } from './identity.service';
import { LoginModel } from './models/login.model';

@Resolver()
export class LoginResolver {
  constructor(private readonly identityService: IdentityService) {}

  @Mutation(() => LoginModel)
  public async login(
    @Args('loginInput', { name: 'login', type: () => LoginUserInput })
    loginDto: LoginUserInput,
  ): Promise<LoginModel> {
    return this.identityService.login(loginDto);
  }
}
