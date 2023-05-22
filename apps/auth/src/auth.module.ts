import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../../libs/provisers';
import { JwtModule } from '@nestjs/jwt';
import { Microservices } from '../../../libs/shared';
import { getProviderOptions, jwtOption } from '../../../libs/options';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register(jwtOption),
    ClientsModule.register([getProviderOptions(Microservices.Auth)]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
