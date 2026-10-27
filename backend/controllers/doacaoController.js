import { buscarCampanhaPorId } from "../services/campanhaService.js";
import { criarDoacao } from "../services/doacaoService.js";

const TIPOS_ITEM = [
    "Água",
    "Alimentos",
    "Roupas",
    "Produtos de higiene",
    "Produtos de limpeza",
    "Outros"
];

export function criarDoacaoController(req, res) {
    const {
        campanhaId,
        nome,
        telefone,
        tipoItem,
        quantidade,
        descricaoAdicional
    } = req.body || {};

    const id = Number(campanhaId);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID da campanha inválido"
        });
    }

    if (typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({
            erro: "Nome é obrigatório"
        });
    }

    const digitosTelefone = typeof telefone === "string" ? telefone.replace(/\D/g, "") : "";

    if (digitosTelefone.length < 10 || digitosTelefone.length > 11) {
        return res.status(400).json({
            erro: "Telefone inválido"
        });
    }

    if (!TIPOS_ITEM.includes(tipoItem)) {
        return res.status(400).json({
            erro: "Tipo de item inválido"
        });
    }

    const qtd = Number(quantidade)

    if (!Number.isInteger(qtd) || quantidade <= 0) {
        return res.status(400).json({
            erro: "Quantidade inválida"
        });
    }

    const campanha = buscarCampanhaPorId(id);

    if (!campanha) {
        return res.status(404).json({
            erro: "Campanha não encontrada"
        });
    }

    const doacao = criarDoacao({
        campanhaId: id,
        nome: nome.trim(),
        telefone: telefone.trim(),
        tipoItem: tipoItem,
        quantidade: quantidade,
        descricaoAdicional: typeof descricaoAdicional === "string" ? descricaoAdicional.trim() : ""
    });

    return res.status(201).json(doacao);
}
