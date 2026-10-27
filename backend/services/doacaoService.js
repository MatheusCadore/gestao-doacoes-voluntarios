import { doacoes } from "../data/doacoes.js";

let proximoId = 1;

export function criarDoacao(dados) {
    const novaDoacao = {
        id: proximoId++,
        campanhaId: dados.campanhaId,
        nome: dados.nome,
        telefone: dados.telefone,
        tipoItem: dados.tipoItem,
        quantidade: dados.quantidade,
        descricaoAdicional: dados.descricaoAdicional
    };

    doacoes.push(novaDoacao);

    return novaDoacao;
}

export function listarDoacoes() {
    return doacoes;
}
