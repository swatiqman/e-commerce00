/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from 'src/app.interface';
import { InjectJwtAppConfig, JwtAppConfig } from 'src/config/jwt-app.config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectJwtAppConfig() jwtConfig: JwtAppConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    })
  }

  async validate(payload: UserModel) {
    return payload;
  }
}
