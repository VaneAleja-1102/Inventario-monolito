"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const data_source_1 = require("../database/data-source");
const ProductRepository_1 = require("../repositories/ProductRepository");
const StockMovementRepository_1 = require("../repositories/StockMovementRepository");
class StockService {
    async list() {
        return ProductRepository_1.inventoryRepo.find({ relations: ['product'] });
    }
    async in(productId, quantity, note) {
        if (quantity <= 0)
            throw { status: 400, message: 'Cantidad inválida' };
        return data_source_1.AppDataSource.transaction(async (manager) => {
            const product = await manager.getRepository(ProductRepository_1.productRepo.target).findOneBy({ id: productId });
            if (!product)
                throw { status: 404, message: 'Producto no encontrado' };
            const invRepoTx = manager.getRepository(ProductRepository_1.inventoryRepo.target);
            let inv = await invRepoTx.findOne({ where: { product: { id: productId } } });
            if (!inv) {
                inv = invRepoTx.create({ product, quantity: 0 });
            }
            inv.quantity += quantity;
            await invRepoTx.save(inv);
            const movRepoTx = manager.getRepository(StockMovementRepository_1.movementRepo.target);
            const mov = movRepoTx.create({ product, type: 'IN', quantity, note });
            await movRepoTx.save(mov);
            return inv;
        });
    }
    async out(productId, quantity, note) {
        if (quantity <= 0)
            throw { status: 400, message: 'Cantidad inválida' };
        return data_source_1.AppDataSource.transaction(async (manager) => {
            const product = await manager.getRepository(ProductRepository_1.productRepo.target).findOneBy({ id: productId });
            if (!product)
                throw { status: 404, message: 'Producto no encontrado' };
            const invRepoTx = manager.getRepository(ProductRepository_1.inventoryRepo.target);
            const inv = await invRepoTx.findOne({ where: { product: { id: productId } } });
            if (!inv || inv.quantity < quantity)
                throw { status: 400, message: 'Stock insuficiente' };
            inv.quantity -= quantity;
            await invRepoTx.save(inv);
            const movRepoTx = manager.getRepository(StockMovementRepository_1.movementRepo.target);
            const mov = movRepoTx.create({ product, type: 'OUT', quantity, note });
            await movRepoTx.save(mov);
            return inv;
        });
    }
}
exports.StockService = StockService;
