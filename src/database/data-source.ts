import { env } from '../config/env';
import { Product } from "../entities/Product";
import { Inventory } from "../entities/Inventory";
import { StockMovement } from "../entities/StockMovement";
import { DataSource } from "typeorm";

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
      ? ['dist/entities/*.js'] // <-- aquí apuntamos a JS compilado
      : [Product, Inventory, StockMovement], // <-- desarrollo
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['dist/migrations/*.js']
      : ['src/migrations/*.ts'],
});
