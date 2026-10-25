import express from "express";
import cors from "cors";

import campanhaRoutes from "./routes/campanhaRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/campanhas", campanhaRoutes);

app.use((req, res) => {
    return res.status(404).json({
        erro: "Rota não encontrada"
    });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});