import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME ?? 'user_java',
    password: process.env.DB_PASSWORD ?? '123',
    name: process.env.DB_NAME ?? 'inventario_db',
    ssl: (process.env.DB_SSL ?? 'false').toLowerCase() === 'true'
  }
};
