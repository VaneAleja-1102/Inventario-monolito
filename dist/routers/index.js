"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const StockController_1 = require("../controllers/StockController");
const validateBody_1 = require("../middleware/validateBody");
const product_dto_1 = require("../dtos/product.dto");
const stock_dto_1 = require("../dtos/stock.dto");
const router = (0, express_1.Router)();
const productCtrl = new ProductController_1.ProductController();
const stockCtrl = new StockController_1.StockController();
router.get('/healthz', (_req, res) => res.json({ ok: true }));
// Products
router.get('/products', productCtrl.list.bind(productCtrl));
router.get('/products/:id', productCtrl.get.bind(productCtrl));
router.post('/products', (0, validateBody_1.validateBody)(product_dto_1.CreateProductDto), productCtrl.create.bind(productCtrl));
router.put('/products/:id', (0, validateBody_1.validateBody)(product_dto_1.UpdateProductDto), productCtrl.update.bind(productCtrl));
router.delete('/products/:id', productCtrl.remove.bind(productCtrl));
// Inventory
router.get('/stock', stockCtrl.list.bind(stockCtrl));
router.post('/stock/in', (0, validateBody_1.validateBody)(stock_dto_1.StockAdjustDto), stockCtrl.in.bind(stockCtrl));
router.post('/stock/out', (0, validateBody_1.validateBody)(stock_dto_1.StockAdjustDto), stockCtrl.out.bind(stockCtrl));
exports.default = router;
