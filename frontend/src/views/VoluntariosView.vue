<template>
    <main class="container py-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="h3">Voluntários registrados</h1>
            <button
                class="btn btn-outline-primary"
                @click="carregar"
                :disabled="carregando"
            >
                Atualizar
            </button>
        </div>
        <div v-if="carregando" class="alert alert-info">
            Carregando registros...
        </div>
        <div v-else-if="erro" class="alert alert-danger">{{ erro }}</div>
        <div v-else-if="registros.length === 0" class="alert alert-secondary">
            Nenhum registro encontrado.
        </div>
        <div v-else class="table-responsive">
            <table class="table table-striped table-bordered align-middle">
                <thead>
                    <tr>
                        <th>Campanha</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Disponibilidade</th>
                        <th>Atividade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in registros" :key="item.id">
                        <td>{{ item.campanhaTitulo }}</td>
                        <td>{{ item.nome }}</td>
                        <td>{{ item.telefone }}</td>
                        <td>{{ item.disponibilidade }}</td>
                        <td>{{ item.atividadeDesejada }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script>
import { API_URL } from "../services/api.js";

export default {
    name: "VoluntariosView",
    data() {
        return {
            registros: [],
            carregando: false,
            erro: ""
        };
    },
    mounted() {
        this.carregar();
    },
    methods: {
        async carregar() {
            this.carregando = true;
            this.erro = "";

            try {
                const resposta = await fetch(`${API_URL}/voluntarios`);
                if (!resposta.ok) throw new Error("Resposta inválida do servidor");
                this.registros = await resposta.json();
            } catch (e) {
                this.erro = "Erro ao carregar os voluntários. Verifique se o backend está rodando.";
            } finally {
                this.carregando = false;
            }
        }
    }
};
</script>
