import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { DataSource } from 'typeorm';
import { Blog, User } from './entities';
import { settings } from '../shared';

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: settings.postgresConnectionOptions.host,
  port: settings.postgresConnectionOptions.port,
  username: settings.postgresConnectionOptions.username,
  password: settings.postgresConnectionOptions.password,
  database: settings.postgresConnectionOptions.database,
  synchronize: true,
  migrations: [__dirname + '/migrations-files/**/*{.ts,.js}'],
  entities: [Blog, User],
};

export default new DataSource(typeOrmConfig);
