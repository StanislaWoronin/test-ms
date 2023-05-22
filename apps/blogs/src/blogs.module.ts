import {Module} from '@nestjs/common';
import {BlogsController} from './blogs.controller';
import {JwtModule} from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm';
import {typeOrmConfig} from '../../../libs/provisers';
import {ClientsModule} from '@nestjs/microservices';
import {Microservices} from '../../../libs/shared';
import {getProviderOptions, jwtOption} from '../../../libs/options';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.register(jwtOption),
    ClientsModule.register([
      getProviderOptions(Microservices.Blogs)
    ]),
  ],
  controllers: [BlogsController],
})
export class BlogsModule {}
