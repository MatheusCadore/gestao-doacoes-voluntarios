import { doacoes } from "../data/doacoes.js";

export function criarDoacao(dados) {
    const novaDoacao = {
        id: doacoes.length + 1,
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
