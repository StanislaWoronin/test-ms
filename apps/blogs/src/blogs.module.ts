import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../../../libs/provisers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Microservices } from '../../../libs/shared';
import { jwtOption } from '../../../libs/options';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register(jwtOption),
    ClientsModule.register([
      {
        name: Microservices.Blogs,
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [BlogsController],
})
export class BlogsModule {}