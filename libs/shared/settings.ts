import dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';
dotenv.config();

export const settings = {
  postgresConnectionOptions: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
  rmqUrl: process.env.RMQ_URL,
  host: {
    localHost: '0.0.0.0',
  },
  secretKey: process.env.SECRET_KEY,
  port: {
    API_GATEWAY_SERVICE: Number(process.env.API_GATEWAY_PORT),
    AUTH_SERVICE: Number(process.env.AUTH_SERVICE_PORT),
    BLOG_SERVICE: Number(process.env.BLOG_SERVICE_PORT),
  },
  token: {
    expiresIn: '1d',
  },
  saltRounds: 10,
  transportName: Transport.TCP,
};
