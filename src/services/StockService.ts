import { AppDataSource } from '../database/data-source';
import { productRepo, inventoryRepo } from '../repositories/ProductRepository';
import { movementRepo } from '../repositories/StockMovementRepository';

export class StockService {
  async list() {
    return inventoryRepo.find({ relations: ['product'] });
  }

  async in(productId: number, quantity: number, note?: string) {
    if (quantity <= 0) throw { status: 400, message: 'Cantidad inválida' };
    return AppDataSource.transaction(async manager => {
      const product = await manager.getRepository(productRepo.target).findOneBy({ id: productId });
      if (!product) throw { status: 404, message: 'Producto no encontrado' };

      const invRepoTx = manager.getRepository(inventoryRepo.target);
      let inv = await invRepoTx.findOne({ where: { product: { id: productId } } });
      if (!inv) {
        inv = invRepoTx.create({ product, quantity: 0 });
      }
      inv.quantity += quantity;
      await invRepoTx.save(inv);

      const movRepoTx = manager.getRepository(movementRepo.target);
      const mov = movRepoTx.create({ product, type: 'IN', quantity, note });
      await movRepoTx.save(mov);

      return inv;
    });
  }

  async out(productId: number, quantity: number, note?: string) {
    if (quantity <= 0) throw { status: 400, message: 'Cantidad inválida' };
    return AppDataSource.transaction(async manager => {
      const product = await manager.getRepository(productRepo.target).findOneBy({ id: productId });
      if (!product) throw { status: 404, message: 'Producto no encontrado' };

      const invRepoTx = manager.getRepository(inventoryRepo.target);
      const inv = await invRepoTx.findOne({ where: { product: { id: productId } } });
      if (!inv || inv.quantity < quantity) throw { status: 400, message: 'Stock insuficiente' };

      inv.quantity -= quantity;
      await invRepoTx.save(inv);

      const movRepoTx = manager.getRepository(movementRepo.target);
      const mov = movRepoTx.create({ product, type: 'OUT', quantity, note });
      await movRepoTx.save(mov);

      return inv;
    });
  }
}
