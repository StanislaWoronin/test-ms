import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../../libs/provisers';
import { JwtModule } from '@nestjs/jwt';
import { Microservices } from '../../../libs/shared';
import { jwtOption } from '../../../libs/options';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register(jwtOption),
    ClientsModule.register([
      {
        name: Microservices.Auth,
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [AuthController],
})
export class AppModule {}
