"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movementRepo = void 0;
const data_source_1 = require("../database/data-source");
const StockMovement_1 = require("../entities/StockMovement");
exports.movementRepo = data_source_1.AppDataSource.getRepository(StockMovement_1.StockMovement);
