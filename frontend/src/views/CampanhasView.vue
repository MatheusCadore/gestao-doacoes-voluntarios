<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container">
      <!-- Cabeçalho -->
      <header class="text-center mb-5">
        <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-3">
          SOS Enchentes — Gestão de Doações e Voluntários
        </span>
        <h1 class="display-5 fw-bold text-dark">Ajude famílias afetadas</h1>
        <p class="text-muted lead mx-auto" style="max-width: 600px;">
          Conheça as campanhas ativas de arrecadação e voluntariado e descubra como pode contribuir para fazer a diferença.
        </p>
      </header>

      <!-- Estados da Interface -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;"></div>
        <p class="mt-3 text-muted fw-medium">A carregar campanhas disponíveis...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger text-center shadow-sm border-0 py-4" role="alert">
        <h5 class="fw-bold">Ocorreu um erro</h5>
        <p class="mb-0">{{ error }}</p>
      </div>

      <div v-else-if="campanhas.length === 0" class="alert alert-warning text-center shadow-sm border-0 py-4" role="alert">
        <h5 class="fw-bold">Nenhuma campanha encontrada</h5>
        <p class="mb-0">Não existem campanhas ativas de momento.</p>
      </div>

      <!-- Listagem em Cards -->
      <div v-else class="row g-4">
        <div v-for="campanha in campanhas" :key="campanha.id" class="col-md-4">
          <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden transition-card">
            <div class="card-body p-4 d-flex flex-column">
              
              <!-- Localização -->
              <div class="d-flex align-items-center text-muted small mb-2">
                <i class="bi bi-geo-alt-fill text-danger me-1"></i>
                <span class="fw-semibold">{{ campanha.cidade }}</span> 
                <span class="mx-1">&bull;</span> 
                <span>{{ campanha.bairro }}</span>
              </div>

              <!-- Título -->
              <h3 class="h5 fw-bold text-dark mb-3">{{ campanha.titulo }}</h3>
              
              <!-- Descrição -->
              <p class="card-text text-secondary small flex-grow-1 mb-4">
                {{ campanha.descricaoResumida }}
              </p>
              
              <!-- Itens Necessários -->
              <div class="mb-3">
                <span class="text-uppercase text-muted fw-bold d-block mb-2" style="font-size: 0.75rem;">Itens Prioritários:</span>
                <div class="d-flex flex-wrap gap-1">
                  <span class="badge bg-light text-secondary border px-2 py-1" v-for="item in campanha.itensNecessarios" :key="item">
                    {{ item }}
                  </span>
                </div>
              </div>

              <!-- Indicador de Voluntários -->
              <div class="mb-4">
                <span class="badge w-100 py-2 rounded-pill fw-normal" :class="campanha.necessitaVoluntarios ? 'bg-success bg-opacity-10 text-success' : 'bg-secondary bg-opacity-10 text-secondary'">
                  {{ campanha.necessitaVoluntarios ? '✨ Precisa de Voluntários' : 'Apenas Arrecadação' }}
                </span>
              </div>

              <!-- Botão -->
              <router-link :to="`/campanhas/${campanha.id}`" class="btn btn-primary w-100 py-2 rounded-3 fw-semibold shadow-sm">
                Ver detalhes e ajudar
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampanhasView',
  data() {
    return {
      campanhas: [],
      loading: true,
      error: null
    }
  },
  async mounted() {
    try {
      const response = await fetch('http://localhost:3000/api/campanhas')
      if (!response.ok) throw new Error('Não foi possível carregar as campanhas.')
      this.campanhas = await response.json()
    } catch (err) {
      this.error = 'Erro ao ligar ao servidor. Certifique-se de que o backend está a correr na porta 3000.'
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.transition-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.transition-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.1) !important;
}
</style>