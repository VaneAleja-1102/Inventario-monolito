import { productRepo, inventoryRepo } from '../repositories/ProductRepository';
import { Product } from '../entities/Product';

export class ProductService {
  async list(): Promise<Product[]> {
    return productRepo.find();
  }

  async get(id: number): Promise<Product> {
    const p = await productRepo.findOneBy({ id });
    if (!p) throw { status: 404, message: 'Producto no encontrado' };
    return p;
  }

  async create(data: { name: string; sku: string; price: number; active?: boolean }): Promise<Product> {
    const exists = await productRepo.findOne({ where: { sku: data.sku } });
    if (exists) throw { status: 409, message: 'SKU ya existe' };
    const p = productRepo.create({ ...data, price: data.price.toFixed(2) });
    const saved = await productRepo.save(p);
    // crear inventario con 0
    const inv = inventoryRepo.create({ product: saved, quantity: 0 });
    await inventoryRepo.save(inv);
    return saved;
  }

  async update(id: number, data: Partial<{ name: string; sku: string; price: number; active: boolean }>) {
    const p = await this.get(id);
    if (data.sku && data.sku !== p.sku) {
      const exists = await productRepo.findOne({ where: { sku: data.sku } });
      if (exists) throw { status: 409, message: 'SKU ya existe' };
    }
    Object.assign(p, data.price !== undefined ? { ...data, price: data.price.toFixed(2) } : data);
    return productRepo.save(p);
  }

  async remove(id: number) {
    await this.get(id);
    await productRepo.delete(id);
  }
}

