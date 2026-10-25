import { campanhas } from "../data/campanhas.js";

export function listarCampanhas() {
    return campanhas;
}

export function buscarCampanhaPorId(id) {
    return campanhas.find(campanha => campanha.id === id);
}
