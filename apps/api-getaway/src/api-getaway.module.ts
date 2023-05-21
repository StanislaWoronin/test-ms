import { Module } from '@nestjs/common';
import { ApiGetawayController } from './api-getaway.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../../libs/provisers';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Microservices, settings } from '../../../libs/shared';
import { jwtOption } from '../../../libs/options';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register(jwtOption),
    ClientsModule.register([
      {
        name: Microservices.Auth,
        transport: Transport.TCP,
        options: {
          host: settings.host.localHost,
          port: settings.port.auth,
        },
      },
      {
        name: Microservices.Blogs,
        transport: Transport.TCP,
        options: {
          host: settings.host.localHost,
          port: settings.port.blogs,
        },
      },
    ]),
  ],
  controllers: [ApiGetawayController],
})
export class ApiGetawayModule {}
