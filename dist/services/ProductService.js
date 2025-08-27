"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const ProductRepository_1 = require("../repositories/ProductRepository");
class ProductService {
    async list() {
        return ProductRepository_1.productRepo.find();
    }
    async get(id) {
        const p = await ProductRepository_1.productRepo.findOneBy({ id });
        if (!p)
            throw { status: 404, message: 'Producto no encontrado' };
        return p;
    }
    async create(data) {
        const exists = await ProductRepository_1.productRepo.findOne({ where: { sku: data.sku } });
        if (exists)
            throw { status: 409, message: 'SKU ya existe' };
        const p = ProductRepository_1.productRepo.create({ ...data, price: data.price.toFixed(2) });
        const saved = await ProductRepository_1.productRepo.save(p);
        // crear inventario con 0
        const inv = ProductRepository_1.inventoryRepo.create({ product: saved, quantity: 0 });
        await ProductRepository_1.inventoryRepo.save(inv);
        return saved;
    }
    async update(id, data) {
        const p = await this.get(id);
        if (data.sku && data.sku !== p.sku) {
            const exists = await ProductRepository_1.productRepo.findOne({ where: { sku: data.sku } });
            if (exists)
                throw { status: 409, message: 'SKU ya existe' };
        }
        Object.assign(p, data.price !== undefined ? { ...data, price: data.price.toFixed(2) } : data);
        return ProductRepository_1.productRepo.save(p);
    }
    async remove(id) {
        await this.get(id);
        await ProductRepository_1.productRepo.delete(id);
    }
}
exports.ProductService = ProductService;
