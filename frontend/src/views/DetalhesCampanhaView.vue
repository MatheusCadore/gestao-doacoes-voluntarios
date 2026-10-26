<template>
  <div class="container py-4">
    <div class="mb-3">
      <router-link to="/campanhas" class="btn btn-outline-secondary btn-sm">
        ← Voltar para Campanhas
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else-if="!campanha" class="alert alert-warning" role="alert">
      Campanha não encontrada.
    </div>

    <div v-else class="card shadow border-0 p-4">
      <h1 class="h3 fw-bold text-primary mb-2">{{ campanha.titulo }}</h1>
      <h5 class="text-muted mb-4">{{ campanha.cidade }} — Bairro: {{ campanha.bairro }}</h5>
      
      <hr />

      <h4 class="h5 mt-3 fw-bold">Sobre a Campanha</h4>
      <p class="text-secondary">{{ campanha.descricaoCompleta }}</p>

      <h4 class="h5 mt-3 fw-bold">Itens Necessários</h4>
      <ul>
        <li v-for="item in campanha.itensNecessarios" :key="item">{{ item }}</li>
      </ul>

      <div class="alert mt-3" :class="campanha.precisaVoluntarios ? 'alert-success' : 'alert-secondary'">
        {{ campanha.precisaVoluntarios ? 'Esta campanha está aceitando inscrições de voluntários.' : 'Esta campanha não necessita de voluntários no momento.' }}
      </div>

      <div class="d-flex gap-3 mt-4">
        <router-link :to="`/ajudar/${campanha.id}?tipo=doacao`" class="btn btn-primary btn-lg flex-grow-1">
          Quero doar
        </router-link>
        
        <router-link 
          :to="`/ajudar/${campanha.id}?tipo=voluntario`" 
          class="btn btn-success btn-lg flex-grow-1"
          :class="{ 'disabled': !campanha.necessitaVoluntarios }"
          :aria-disabled="!campanha.necessitaVoluntarios">
          Quero ser voluntário
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetalhesCampanhaView',
  props: ['id'],
  data() {
    return {
      campanha: null,
      loading: true,
      error: null
    }
  },
  async mounted() {
    try {
      const response = await fetch(`http://localhost:3000/api/campanhas/${this.id}`)
      if (!response.ok) {
        if (response.status === 404) throw new Error('Campanha não encontrada.')
        throw new Error('Erro ao buscar detalhes.')
      }
      this.campanha = await response.json()
    } catch (err) {
      this.error = err.message
    } finally {
      this.loading = false
    }
  }
}
</script>