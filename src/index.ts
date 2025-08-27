import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import router from "./routers"; // <-- importa tu router principal

const app = express();

app.use(express.json());

// Health check
app.get("/api/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Aquí registramos todas las rutas de tu router
app.use("/api", router); // <-- ahora /api/products, /api/stock, etc. funcionarán

// Middleware global de errores
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});
