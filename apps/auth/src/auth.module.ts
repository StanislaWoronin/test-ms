import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../../libs/provisers';
import { JwtModule } from '@nestjs/jwt';
import { Microservices } from '../../../libs/shared';
import { jwtOption } from '../../../libs/options';
import { getTransportOptions } from '../../../libs/options/transport-options.switcher';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register(jwtOption),
    ClientsModule.register([getTransportOptions(Microservices.Auth)]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
