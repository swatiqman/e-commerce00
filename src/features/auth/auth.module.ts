import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAppConfig, jwtAppConfig } from 'src/config/jwt-app.config';
import { TypeOrmExModule } from 'src/decorators/typeorm/typeorm-ex.module';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [jwtAppConfig.KEY],
      useFactory: ({ secret, expiresIn }: JwtAppConfig) => {
        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule {}
