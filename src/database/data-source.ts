import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../config/env';
import { Product } from '../entities/Product';
import { Inventory } from '../entities/Inventory';
import { StockMovement } from '../entities/StockMovement';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.name,
  ssl: env.db.ssl ? { rejectUnauthorized: false } : false,
  synchronize: false, // ¡Nunca en prod! Usamos migraciones.
  logging: false,
  entities: [Product, Inventory, StockMovement],
  migrations: ['dist/migrations/*.js'] // en prod correremos compiladas
});
