"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const errorHandler_1 = require("./middleware/errorHandler");
require("reflect-metadata");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Ruta raíz opcional
app.get("/", (_req, res) => {
    res.send("Bienvenido a Inventario Monolito API");
});
// Health check
app.get("/api/healthz", (_req, res) => {
    res.status(200).json({ status: "ok" });
});
// Todas tus rutas
app.use("/api", routers_1.default);
// Middleware de errores (al final)
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Servidor escuchando en http://localhost:${port}`));
