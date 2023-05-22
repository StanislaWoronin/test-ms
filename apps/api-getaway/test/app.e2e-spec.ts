import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ApiGetawayModule } from '../src/api-getaway.module';
import { RegistrationDto } from '../../../libs/users/dto';
import { BlogDto } from '../../../libs/blogs/dto';
import { settings } from '../../../libs/shared';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGetawayModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Create users', () => {
    it('Create users', async () => {
      const registrationDto: RegistrationDto = {
        login: 'Loreley',
        email: 'somemail@mail.com',
        password: 'qwerty',
      };

      const response = await request(app.getHttpServer())
        .post('/api/registration')
        .send(registrationDto);
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toStrictEqual({
        user: {
          id: expect.any(String),
          login: registrationDto.login,
          email: registrationDto.email,
          createdAt: expect.any(String),
        },
        token: expect.any(String),
      });

      expect.setState({
        userId: response.body.user.id,
        token: response.body.token,
      });
    });
  });

  describe('Create blogs', () => {
    it('Create blogs', async () => {
      const { userId, token } = expect.getState();

      const createBlogDto: BlogDto = {
        title: 'BlogTitle',
        description: 'Blog about microservices advantage',
        content: 'Some one useful content...',
      };

      const response = await request(app.getHttpServer())
        .post('/api/blogs/create')
        .auth(token, { type: 'bearer' })
        .send(createBlogDto);
      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body).toStrictEqual({
        id: expect.any(String),
        userId: userId,
        title: createBlogDto.title,
        description: createBlogDto.description,
        content: createBlogDto.content,
        createdAt: expect.any(String),
      });

      expect.setState({ blog: response.body });
    });
  });

  describe('Get all blogs current users', () => {
    it('Get blogs', async () => {
      const { blog, token } = expect.getState();

      const response = await request(app.getHttpServer())
        .get('/api/blogs')
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body[0]).toStrictEqual([
        {
          id: expect.any(String),
          userId: blog.userId,
          title: blog.title,
          description: blog.description,
          content: blog.content,
          createdAt: expect.any(String),
        },
      ]);
      expect(response.body[1]).toBe(1);
    });

    it('Crate and return some blogs', async () => {
      const { blog, token } = expect.getState();
      const blogsCount = 5;
      const blogs = [];
      blogs.push(blog);
      for (let i = 0; i < blogsCount; i++) {
        const createBlogDto: BlogDto = {
          title: `${i + 1} - BlogTitle`,
          description: 'Blog about microservices advantage',
          content: 'Some one useful content...',
        };

        const response = await request(app.getHttpServer())
          .post('/api/blogs/create')
          .auth(token, { type: 'bearer' })
          .send(createBlogDto);

        blogs.push(response.body);
      }

      const response = await request(app.getHttpServer())
        .get('/api/blogs')
        .auth(token, { type: 'bearer' });
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body[0]).toStrictEqual(blogs);
      expect(response.body[1]).toBe(blogsCount + 1);
    });
  });
});
