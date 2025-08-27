"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const routers_1 = __importDefault(require("./routers")); // <-- importa tu router principal
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Health check
app.get("/api/healthz", (req, res) => {
    res.status(200).json({ status: "ok" });
});
// Aquí registramos todas las rutas de tu router
app.use("/api", routers_1.default); // <-- ahora /api/products, /api/stock, etc. funcionarán
// Middleware global de errores
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});
