import { Column, Entity, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';
import { IBlog } from '../../blogs';
import { CreateBlogDto } from '../../blogs/dto';

@Entity()
export class Blog implements IBlog {
  @PrimaryColumn('uuid')
  id = randomUUID();

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  createdAt: string = new Date().toISOString();

  static create(createBlogDto: CreateBlogDto) {
    const { userId, dto } = createBlogDto;
    const _blog = new Blog();
    Object.assign(_blog, dto);
    _blog.userId = userId;

    return _blog;
  }
}
