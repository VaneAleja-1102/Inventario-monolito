import express from "express";
import {errorHandler} from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware global de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});
