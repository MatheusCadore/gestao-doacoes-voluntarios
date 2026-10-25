const express = require("express");

const app = express();
const PORT = 3000;

// Permite receber JSON nas requisições
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
    res.json({
        mensagem: "Servidor funcionando!"
    });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});