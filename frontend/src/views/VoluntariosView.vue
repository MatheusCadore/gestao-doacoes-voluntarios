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
                    <tr
                        v-for="(item, index) in registros"
                        :key="item.id ?? index"
                    >
                        <td>{{ item.campanhaId ?? "—" }}</td>
                        <td>{{ item.nome ?? "—" }}</td>
                        <td>{{ item.telefone ?? "—" }}</td>
                        <td>{{ item.disponibilidade ?? "—" }}</td>
                        <td>{{ item.atividadeDesejada ?? "—" }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script setup>
import { ref, onMounted } from "vue";

const registros = ref([]);
const carregando = ref(false);
const erro = ref("");

async function carregar() {
    carregando.value = true;
    erro.value = "";
    try {
        const resposta = await fetch("http://localhost:3000/api/voluntarios");
        if (!resposta.ok)
            throw new Error(
                `Falha na consulta (HTTP ${resposta.status}). Verifique se existe uma rota GET /api/voluntarios no backend.`,
            );
        const dados = await resposta.json();
        if (!Array.isArray(dados))
            throw new Error(
                "A API não retornou uma lista. Verifique o formato da resposta GET.",
            );
        registros.value = dados;
    } catch (e) {
        erro.value = e.message;
    } finally {
        carregando.value = false;
    }
}
onMounted(carregar);
</script>
