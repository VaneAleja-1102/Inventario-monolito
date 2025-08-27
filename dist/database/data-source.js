"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("../entities/Product");
const Inventory_1 = require("../entities/Inventory");
const StockMovement_1 = require("../entities/StockMovement");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'dpg-d2n66en5r7bs73f5nnog-a',
    port: 5432,
    username: 'vanessa_sql_user',
    password: 'HywMnL4nthzGCyvBtiHohDGwN6L0Atqk',
    database: 'vanessa_sql',
    ssl: { rejectUnauthorized: false },
    synchronize: false,
    logging: false,
    entities: process.env.NODE_ENV === 'production'
        ? ['dist/entities/*.js'] // JS compilado en producción
        : [Product_1.Product, Inventory_1.Inventory, StockMovement_1.StockMovement], // TS en desarrollo
    migrations: process.env.NODE_ENV === 'production'
        ? ['dist/migrations/*.js'] // JS compilado en producción
        : ['src/migrations/*.ts'], // TS en desarrollo
});
