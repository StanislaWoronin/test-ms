import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
import { Blog, User } from './entities';
import { settings } from '../shared';

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'test_ms',
  synchronize: true,
  migrations: [__dirname + '/migrations-files/**/*{.ts,.js}'],
  entities: [Blog, User],
};

export default new DataSource(typeOrmConfig);
