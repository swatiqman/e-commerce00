import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmExModule } from 'src/decorators/typeorm/typeorm-ex.module';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
})
export class UserModule {}
