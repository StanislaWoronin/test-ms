import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../../libs/provisers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Microservices } from '../../../libs/shared';
import { jwtOption } from '../../../libs/options';
import { getTransportOptions } from '../../../libs/options/transport-options.switcher';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register(jwtOption),
    ClientsModule.register([getTransportOptions(Microservices.Blogs)]),
  ],
  controllers: [BlogsController],
})
export class BlogsModule {}
