"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invRepo = void 0;
const data_source_1 = require("../database/data-source");
const Inventory_1 = require("../entities/Inventory");
exports.invRepo = data_source_1.AppDataSource.getRepository(Inventory_1.Inventory);
