import { Body, Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBlogDto } from '../../../libs/blogs/dto';
import { Blog } from '../../../libs/provisers/entities';

@Controller()
export class BlogsController {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  @MessagePattern({ cmd: 'create_blog' })
  async createBlog(@Body() createBlogDto: CreateBlogDto) {
    const blogAggregate = Blog.create(createBlogDto);
    const createdBlog = await this.dataSource
      .getRepository(Blog)
      .save(blogAggregate);

    return createdBlog;
  }

  @MessagePattern({ cmd: 'get_blogs' })
  async getBlogs(@Body() id: { userId: string }) {
    const res = await this.dataSource.getRepository(Blog).findAndCount({
      where: { userId: id.userId },
    });

    return res;
  }
}