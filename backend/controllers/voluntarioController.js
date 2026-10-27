import { buscarCampanhaPorId } from "../services/campanhaService.js";
import { criarVoluntario, listarVoluntarios } from "../services/voluntarioService.js";

const DISPONIBILIDADES = [
    "Manhã",
    "Tarde",
    "Noite",
    "Integral"
];

const ATIVIDADES = [
    "Organização de doações",
    "Distribuição de materiais",
    "Apoio logístico",
    "Qualquer atividade"
];

export function criarVoluntarioController(req, res) {
    const {
        campanhaId,
        nome,
        telefone,
        disponibilidade,
        atividadeDesejada
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

    if (!DISPONIBILIDADES.includes(disponibilidade)) {
        return res.status(400).json({
            erro: "Disponibilidade inválida"
        });
    }

    if (!ATIVIDADES.includes(atividadeDesejada)) {
        return res.status(400).json({
            erro: "Atividade desejada inválida"
        });
    }

    const campanha = buscarCampanhaPorId(id);

    if (!campanha) {
        return res.status(404).json({
            erro: "Campanha não encontrada"
        });
    }

    if (!campanha.necessitaVoluntarios) {
        return res.status(400).json({
            erro: "Esta campanha não precisa de voluntários"
        });
    }

    const voluntario = criarVoluntario({
        campanhaId: id,
        nome: nome.trim(),
        telefone: telefone.trim(),
        disponibilidade: disponibilidade,
        atividadeDesejada: atividadeDesejada
    });

    return res.status(201).json(voluntario);
}

export function listarVoluntariosController(req, res) {
    return res.status(200).json(listarVoluntarios());
}
