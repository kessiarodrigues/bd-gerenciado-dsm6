import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Product } from '../../domain/entities/product';

dotenv.config();

//Usaremos as credenciais do .env
export const dataSource = new DataSource({
  type: 'postgres',
  logging: true,
  replication: {
    master: {
      host: process.env.PRIMARY_DATABASE_HOST,
      port: Number(process.env.PRIMARY_DATABASE_PORT),
      username: process.env.PRIMARY_DATABASE_USER,
      password: process.env.PRIMARY_DATABASE_PASSWORD,
      database: process.env.PRIMARY_DATABASE_DATABASE,
    },
    slaves: [
      {
        host: process.env.SLAVE_DATABASE_HOST,
        port: Number(process.env.SLAVE_DATABASE_PORT),
        username: process.env.SLAVE_DATABASE_USER,
        password: process.env.SLAVE_DATABASE_PASSWORD,
        database: process.env.SLAVE_DATABASE_DATABASE,
      },
    ],
  },
  entities: [Product],
});
