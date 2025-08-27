"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const env_1 = require("../config/env");
const Product_1 = require("../entities/Product");
const Inventory_1 = require("../entities/Inventory");
const StockMovement_1 = require("../entities/StockMovement");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: env_1.env.db.host,
    port: env_1.env.db.port,
    username: env_1.env.db.username,
    password: env_1.env.db.password,
    database: env_1.env.db.name,
    ssl: env_1.env.db.ssl ? { rejectUnauthorized: false } : false,
    synchronize: false, // ¡Nunca en prod! Usamos migraciones.
    logging: false,
    entities: [Product_1.Product, Inventory_1.Inventory, StockMovement_1.StockMovement],
    migrations: ['dist/migrations/*.js'] // en prod correremos compiladas
});
