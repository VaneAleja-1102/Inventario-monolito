import { env } from '../config/env';
import { Product } from "../entities/Product";
import { Inventory } from "../entities/Inventory";
import { StockMovement } from "../entities/StockMovement";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.name,
  ssl: env.db.ssl ? { rejectUnauthorized: false } : false,
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
