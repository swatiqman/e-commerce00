/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserRepository } from 'src/repositories/user.repository';
import {
  findOneEntity,
  findEntity,
  createEntity,
  updateEntity,
  deleteEntity,
} from 'src/utils/crud-helper.util';

@Injectable()
export class UserService {
  repoName = 'user';
  constructor(private repository: UserRepository) {}

  findOne(id: string) {
    return findOneEntity(this.repository, this.repoName, id);
  }

  find(
    pagination: IPaginationOptions,
    query?: Record<string, unknown>,
    reverse?: boolean,
  ) {
    return findEntity(this.repository, pagination, query, reverse);
  }

  create(data: CreateUserDto) {
    return createEntity(this.repository, this.repoName, data);
  }

  update(id: string, data: UpdateUserDto) {
    return updateEntity(this.repository, this.repoName, id, data);
  }

  delete(id: string) {
    return deleteEntity(this.repository, this.repoName, id);
  }
}
