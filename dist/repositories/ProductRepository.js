"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRepo = exports.productRepo = void 0;
const data_source_1 = require("../database/data-source");
const Product_1 = require("../entities/Product");
const Inventory_1 = require("../entities/Inventory");
exports.productRepo = data_source_1.AppDataSource.getRepository(Product_1.Product);
exports.inventoryRepo = data_source_1.AppDataSource.getRepository(Inventory_1.Inventory);
