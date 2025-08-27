import express from "express";
import {errorHandler} from "./middleware/errorHandler";

const app = express();


app.use(express.json());
app.get("/api/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});
// Middleware global de errores
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});
