import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  public async findOneUserById(
    userId: number,
    conditions?: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(userId, conditions);
    return user;
  }

  public async findOneUserByConditions(
    conditions: FindOneOptions<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(conditions);
    return user;
  }

  // public createUser(): User {}

  // public updateUser(): User {}

  public async getUserById(userId: number): Promise<User> {
    const user = await this.findOneUserById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // public getUsers(): User {}

  // public deleteUser(): User {}
}
