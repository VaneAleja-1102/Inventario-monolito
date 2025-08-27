import { AppDataSource } from '../database/data-source';
import { Inventory } from '../entities/Inventory';
export const invRepo = AppDataSource.getRepository(Inventory);
