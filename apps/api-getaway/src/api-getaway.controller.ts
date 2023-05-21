import { Controller, Post, Get, Body, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RegistrationResponse } from '../../../libs/users/response';
import { RegistrationDto } from '../../../libs/users/dto';
import { AuthBearerGuard } from '../../../libs/guards';
import { CreateBlogDto } from '../../../libs/blogs/dto';
import { CurrentUser } from '../../../libs/decorators';
import { CreateBlogResponse } from '../../../libs/blogs/response';
import { Commands, Microservices } from '../../../libs/shared';

@Controller('api')
export class ApiGetawayController {
  constructor(
    @Inject(Microservices.Auth) private userProxyClient: ClientProxy,
    @Inject(Microservices.Blogs) private blogProxyClient: ClientProxy,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  @Post('registration')
  async registration(@Body() dto: RegistrationDto) {
    const pattern = { cmd: Commands.Registration };
    return this.userProxyClient.send<RegistrationResponse>(pattern, dto);
  }

  @UseGuards(AuthBearerGuard)
  @Post('blogs/create')
  async createBlog(@Body() dto: CreateBlogDto, @CurrentUser() userId: string) {
    const pattern = { cmd: Commands.CreateBlog };
    return this.blogProxyClient.send<CreateBlogResponse>(pattern, {
      userId,
      dto,
    });
  }

  @UseGuards(AuthBearerGuard)
  @Get('blogs')
  async getBlogs(@CurrentUser() userId: string) {
    const pattern = { cmd: Commands.GetBlogs };
    return this.blogProxyClient.send<[CreateBlogResponse[], number]>(pattern, {
      userId,
    });
  }
}
