import { AppDataSource } from '../database/data-source';
import { Product } from '../entities/Product';
import { Inventory } from '../entities/Inventory';

export const productRepo = AppDataSource.getRepository(Product);
export const inventoryRepo = AppDataSource.getRepository(Inventory);

