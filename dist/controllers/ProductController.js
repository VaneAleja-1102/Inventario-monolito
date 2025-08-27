"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
const service = new ProductService_1.ProductService();
class ProductController {
    async list(_req, res) {
        const data = await service.list();
        res.json(data);
    }
    async get(req, res) {
        const id = Number(req.params.id);
        const data = await service.get(id);
        res.json(data);
    }
    async create(req, res) {
        const data = await service.create(req.body);
        res.status(201).json(data);
    }
    async update(req, res) {
        const id = Number(req.params.id);
        const data = await service.update(id, req.body);
        res.json(data);
    }
    async remove(req, res) {
        const id = Number(req.params.id);
        await service.remove(id);
        res.status(204).send();
    }
}
exports.ProductController = ProductController;
