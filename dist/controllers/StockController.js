"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const StockService_1 = require("../services/StockService");
const service = new StockService_1.StockService();
class StockController {
    async list(_req, res) {
        const data = await service.list();
        res.json(data);
    }
    async in(req, res) {
        const productId = Number(req.body.productId);
        const quantity = Number(req.body.quantity);
        const note = req.body.note;
        const data = await service.in(productId, quantity, note);
        res.json(data);
    }
    async out(req, res) {
        const productId = Number(req.body.productId);
        const quantity = Number(req.body.quantity);
        const note = req.body.note;
        const data = await service.out(productId, quantity, note);
        res.json(data);
    }
}
exports.StockController = StockController;
