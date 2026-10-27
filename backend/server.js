import express from "express";
import cors from "cors";

import campanhaRoutes from "./routes/campanhaRoutes.js";
import doacaoRoutes from "./routes/doacaoRoutes.js";
import voluntarioRoutes from "./routes/voluntarioRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/campanhas", campanhaRoutes);
app.use("/api/doacoes", doacaoRoutes);
app.use("/api/voluntarios", voluntarioRoutes);

app.use((req, res) => {
    return res.status(404).json({
        erro: "Rota não encontrada"
    });
});

// Trata erros, como JSON mal formatado enviado no corpo da requisição
app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ erro: "JSON inválido" });
    }

    return res.status(500).json({ erro: "Erro interno do servidor" });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});