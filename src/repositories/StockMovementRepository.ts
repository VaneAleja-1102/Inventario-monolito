import { AppDataSource } from '../database/data-source';
import { StockMovement } from '../entities/StockMovement';
export const movementRepo = AppDataSource.getRepository(StockMovement);
