import express from "express";
import router from "./routers";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

// Ruta raíz opcional
app.get("/", (_req, res) => {
  res.send("Bienvenido a Inventario Monolito API");
});

// Health check
app.get("/api/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Todas tus rutas
app.use("/api", router);

// Middleware de errores (al final)
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Servidor escuchando en http://localhost:${port}`));
