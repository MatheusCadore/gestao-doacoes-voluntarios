import {
    listarCampanhas,
    buscarCampanhaPorId
} from "../services/campanhaService.js";

export function listarCampanhasController(req, res) {
    const campanhas = listarCampanhas();

    return res.status(200).json(campanhas);
}

export function buscarCampanhaController(req, res) {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID inválido"
        });
    }

    const campanha = buscarCampanhaPorId(id);

    if (!campanha) {
        return res.status(404).json({
            erro: "Campanha não encontrada"
        });
    }

    return res.status(200).json(campanha);
}
