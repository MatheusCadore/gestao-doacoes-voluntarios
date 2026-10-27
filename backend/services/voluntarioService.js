import { voluntarios } from "../data/voluntarios.js";

let proximoId = 1;

export function criarVoluntario(dados) {
    const novoVoluntario = {
        id: proximoId++,
        campanhaId: dados.campanhaId,
        nome: dados.nome,
        telefone: dados.telefone,
        disponibilidade: dados.disponibilidade,
        atividadeDesejada: dados.atividadeDesejada
    };

    voluntarios.push(novoVoluntario);

    return novoVoluntario;
}

export function listarVoluntarios() {
    return voluntarios;
}
