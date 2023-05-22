import {Module} from '@nestjs/common';
import {ApiGetawayController} from './api-getaway.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from '../../../libs/provisers';
import {JwtModule} from '@nestjs/jwt';
import {ClientsModule} from '@nestjs/microservices';
import {Microservices} from '../../../libs/shared';
import {jwtOption} from '../../../libs/options';
import {getProviderOptions} from "../../../libs/options";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register(jwtOption),
    ClientsModule.register([
      getProviderOptions(Microservices.Auth),
      getProviderOptions(Microservices.Blogs)
    ]),
  ],
  controllers: [ApiGetawayController],
})
export class ApiGetawayModule {}
