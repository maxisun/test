import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInput } from './dto/update-user.dto';
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

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  public async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
    const preloadedUser = await this.usersRepository.preload(updateUserInput);
    if (!preloadedUser) throw new NotFoundException('user not found');

    const persistedUser = await this.usersRepository.save(preloadedUser);
    return plainToClass(User, persistedUser);
  }

  public async getUserById(userId: number): Promise<User> {
    const user = await this.findOneUserById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  // public deleteUser(): User {}
}
