/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common'
import { ConfigType, registerAs } from '@nestjs/config'

export const jwtAppConfig = registerAs('jwt', () => {
  return {
    secret: process.env['JWT_SECRET'],
    expiresIn: process.env['JWT_EXPIRES_IN'],
  }
})

export type JwtAppConfig = ConfigType<typeof jwtAppConfig>

export const InjectJwtAppConfig = () => Inject(jwtAppConfig.KEY)
