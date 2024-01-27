/* eslint-disable prettier/prettier */
import { CustomRepository } from 'src/decorators/typeorm/typeorm-ex.decorator';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(data: Partial<UserEntity>, hashedPassword: string) {
    return await this.save({
      ...data,
      password: hashedPassword,
    });
  }
}
