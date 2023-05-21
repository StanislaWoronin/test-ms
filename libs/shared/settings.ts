import dotenv from 'dotenv';
dotenv.config();

export const settings = {
  host: {
    localHost: '0.0.0.0',
  },
  secretKey: process.env.SECRET_KEY,
  port: {
    apiGetaway: Number(process.env.API_GATEWAY_PORT),
    auth: Number(process.env.AUTH_SERVICE_PORT),
    blogs: Number(process.env.BLOG_SERVICE_PORT),
  },
  token: {
    expiresIn: '1d',
  },
  saltRounds: 10,
};
