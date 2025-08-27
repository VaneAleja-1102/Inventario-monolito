import { Request, Response } from 'express';
import { StockService } from '../services/StockService';

const service = new StockService();

export class StockController {
  async list(_req: Request, res: Response) {
    const data = await service.list();
    res.json(data);
  }

  async in(req: Request, res: Response) {
    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);
    const note = req.body.note;
    const data = await service.in(productId, quantity, note);
    res.json(data);
  }

  async out(req: Request, res: Response) {
    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);
    const note = req.body.note;
    const data = await service.out(productId, quantity, note);
    res.json(data);
  }
}

