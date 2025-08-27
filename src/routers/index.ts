import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { StockController } from '../controllers/StockController';
import { validateBody } from '../middleware/validateBody';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { StockAdjustDto } from '../dtos/stock.dto';

const router = Router();
const productCtrl = new ProductController();
const stockCtrl = new StockController();

router.get('/healthz', (_req, res) => res.json({ ok: true }));

// Products
router.get('/products', productCtrl.list.bind(productCtrl));
router.get('/products/:id', productCtrl.get.bind(productCtrl));
router.post('/products', validateBody(CreateProductDto), productCtrl.create.bind(productCtrl));
router.put('/products/:id', validateBody(UpdateProductDto), productCtrl.update.bind(productCtrl));
router.delete('/products/:id', productCtrl.remove.bind(productCtrl));

// Inventory
router.get('/stock', stockCtrl.list.bind(stockCtrl));
router.post('/stock/in', validateBody(StockAdjustDto), stockCtrl.in.bind(stockCtrl));
router.post('/stock/out', validateBody(StockAdjustDto), stockCtrl.out.bind(stockCtrl));

export default router;
