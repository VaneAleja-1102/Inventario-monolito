"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const env_1 = require("../config/env");
const Product_1 = require("../entities/Product");
const Inventory_1 = require("../entities/Inventory");
const StockMovement_1 = require("../entities/StockMovement");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_1.env.db.host,
    port: env_1.env.db.port,
    username: env_1.env.db.username,
    password: env_1.env.db.password,
    database: env_1.env.db.name,
    ssl: env_1.env.db.ssl ? { rejectUnauthorized: false } : false,
    synchronize: false,
    logging: false,
    entities: process.env.NODE_ENV === 'production'
        ? ['dist/entities/*.js'] // <-- aquí apuntamos a JS compilado
        : [Product_1.Product, Inventory_1.Inventory, StockMovement_1.StockMovement], // <-- desarrollo
    migrations: process.env.NODE_ENV === 'production'
        ? ['dist/migrations/*.js']
        : ['src/migrations/*.ts'],
});
