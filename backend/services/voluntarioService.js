import { voluntarios } from "../data/voluntarios.js";

export function criarVoluntario(dados) {
    const novoVoluntario = {
        id: voluntarios.length + 1,
        campanhaId: dados.campanhaId,
        nome: dados.nome,
        telefone: dados.telefone,
        disponibilidade: dados.disponibilidade,
        atividadeDesejada: dados.atividadeDesejada
    };

    voluntarios.push(novoVoluntario);

    return novoVoluntario;
}
