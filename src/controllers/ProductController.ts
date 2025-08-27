import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

const service = new ProductService();

export class ProductController {
  async list(_req: Request, res: Response) {
    const data = await service.list();
    res.json(data);
  }

  async get(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.get(id);
    res.json(data);
  }

  async create(req: Request, res: Response) {
    const data = await service.create(req.body);
    res.status(201).json(data);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = await service.update(id, req.body);
    res.json(data);
  }

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await service.remove(id);
    res.status(204).send();
  }
}
