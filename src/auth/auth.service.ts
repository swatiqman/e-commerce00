/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { argon2id, hash, verify } from 'argon2';
import { LoginModel, UserModel } from 'src/app.interface';
import { InjectJwtAppConfig, JwtAppConfig } from 'src/config/jwt-app.config';
import { SignUpDto } from 'src/dto/auth/sign-up.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userRepo: UserRepository,
    @InjectJwtAppConfig() private jwtConfig: JwtAppConfig,
  ) {}

  async signup(user: SignUpDto) {
    try {
      const { password, ..._user } = user;
      const hashedPassword = await this.hasUserPassword(password);
      await this.userRepo.save({
        ..._user,
        password: hashedPassword,
      });

      return 'User successfully created';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.code === '23505')
        throw new ConflictException('user already exist');

      throw new BadRequestException(error?.message);
    }
  }

  async validateUser(data: LoginModel) {
    const { password, username: email } = data;

    try {
      const { password: hasPassword, ...user } =
        await this.userRepo.findOneOrFail({
          where: { email },
          loadEagerRelations: false,
        });

      if (await verify(hasPassword, password)) {
        return user;
      }

      return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof EntityNotFoundError)
        throw new NotFoundException('user does not Exist');

      throw new BadRequestException('OOPs....Something went wrong');
    }
  }

  async getAuthUser({ id }: UserModel) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const user = await this.userRepo.findOneOrFail({
        loadEagerRelations: false,
        where: { id },
      });
      // const {}
      return user;
    } catch (error) {
      throw new UnauthorizedException('user unauthorized');
    }
  }

  async hasUserPassword(password: string) {
    return await hash(password, { type: argon2id });
  }
}
