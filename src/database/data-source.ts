import { DataSource } from 'typeorm';
import { Product } from '../entities/Product';
import { Inventory } from '../entities/Inventory';
import { StockMovement } from '../entities/StockMovement';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-d2n66en5r7bs73f5nnog-a',
  port: 5432,
  username: 'vanessa_sql_user',
  password: 'HywMnL4nthzGCyvBtiHohDGwN6L0Atqk',
  database: 'vanessa_sql',
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  logging: false,
  entities:
    process.env.NODE_ENV === 'production'
      ? ['dist/entities/*.js'] // JS compilado en producción
      : [Product, Inventory, StockMovement], // TS en desarrollo
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/migrations/*.js'] // JS compilado en producción
      : ['src/migrations/*.ts'], // TS en desarrollo
});
