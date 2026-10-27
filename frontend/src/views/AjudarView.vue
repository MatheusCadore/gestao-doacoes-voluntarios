<template>
  <div class="container py-4">
    <div class="mb-3">
      <router-link :to="`/campanhas/${id}`" class="btn btn-outline-secondary btn-sm">
        ← Voltar aos Detalhes
      </router-link>
    </div>

    <div class="card shadow border-0 p-4 mx-auto" style="max-width: 600px;">
      <h2 class="h4 fw-bold text-primary mb-3">Registrar Participação</h2>
      
      <div v-if="campanha" class="alert alert-light border mb-4">
        <h5 class="fw-bold mb-1">{{ campanha.titulo }}</h5>
        <p class="mb-0 text-muted small">{{ campanha.cidade }} - Bairro: {{ campanha.bairro }}</p>
        <hr class="my-2">
        <span class="text-secondary small">Você está contribuindo com esta campanha.</span>
      </div>

      <div v-if="sucesso" class="alert alert-success text-center">
        <p class="fw-bold mb-2">Sua participação foi registrada com sucesso! Obrigado por ajudar.</p>
        <router-link to="/campanhas" class="btn btn-primary mt-2">Voltar para campanhas</router-link>
      </div>

      <form v-else @submit.prevent="enviarFormulario">
        <!-- Tipo de Ajuda -->
        <div class="mb-3">
          <label class="form-label fw-bold">Tipo de ajuda *</label>
          <select v-model="form.tipoAjuda" class="form-select" required>
            <option value="doacao">Doação</option>
            <option value="voluntario">Voluntariado</option>
          </select>
        </div>

        <!-- Campos Comuns -->
        <div class="mb-3">
          <label class="form-label">Nome completo *</label>
          <input type="text" v-model="form.nome" class="form-control" placeholder="Digite seu nome completo" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Telefone para contato *</label>
          <input type="text" v-model="form.telefone" class="form-control" placeholder="(00) 00000-0000" required />
        </div>

        <!-- Campos Exclusivos de Doação -->
        <template v-if="form.tipoAjuda === 'doacao'">
          <div class="mb-3">
            <label class="form-label">Tipo de item *</label>
            <select v-model="form.tipoItem" class="form-select" required>
              <option disabled value="">Selecione o item</option>
              <option value="Água">Água</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Roupas">Roupas</option>
              <option value="Produtos de higiene">Produtos de higiene</option>
              <option value="Produtos de limpeza">Produtos de limpeza</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Quantidade *</label>
            <input type="number" v-model.number="form.quantidade" class="form-control" min="1" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Descrição adicional</label>
            <textarea v-model="form.descricaoAdicional" class="form-control" placeholder="Descreva os itens que deseja doar (ex: 10 garrafas de água)"></textarea>
          </div>
        </template>

        <!-- Campos Exclusivos de Voluntariado -->
        <template v-if="form.tipoAjuda === 'voluntario'">
          <div class="mb-3">
            <label class="form-label">Disponibilidade *</label>
            <select v-model="form.disponibilidade" class="form-select" required>
              <option disabled value="">Selecione a disponibilidade</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
              <option value="Integral">Integral</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Atividade desejada *</label>
            <select v-model="form.atividadeDesejada" class="form-select" required>
              <option disabled value="">Selecione a atividade</option>
              <option value="Organização de doações">Organização de doações</option>
              <option value="Distribuição de materiais">Distribuição de materiais</option>
              <option value="Apoio logístico">Apoio logístico</option>
              <option value="Qualquer atividade">Qualquer atividade</option>
            </select>
          </div>
        </template>

        <div v-if="erroEnvio" class="alert alert-danger py-2">{{ erroEnvio }}</div>

        <div class="d-flex gap-2 mt-4">
          <button type="submit" class="btn btn-primary flex-grow-1" :disabled="enviando">
            {{ enviando ? 'Enviando...' : 'Confirmar participação' }}
          </button>
          <router-link :to="`/campanhas/${id}`" class="btn btn-outline-secondary">Cancelar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AjudarView',
  props: ['id'],
  data() {
    return {
      campanha: null,
      form: {
        tipoAjuda: this.$route.query.tipo === 'voluntario' ? 'voluntario' : 'doacao',
        nome: '',
        telefone: '',
        tipoItem: '',
        quantidade: 1,
        descricaoAdicional: '',
        disponibilidade: '',
        atividadeDesejada: ''
      },
      enviando: false,
      sucesso: false,
      erroEnvio: null
    }
  },
  async mounted() {
    try {
      const res = await fetch(`http://localhost:3000/api/campanhas/${this.id}`)
      if (res.ok) this.campanha = await res.json()
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    async enviarFormulario() {
      this.enviando = true
      this.erroEnvio = null

      const isDoacao = this.form.tipoAjuda === 'doacao'
      const endpoint = isDoacao ? 'http://localhost:3000/api/doacoes' : 'http://localhost:3000/api/voluntarios'
      
      // Converte this.id para número para evitar divergências de tipo com o backend
      const campanhaIdNum = Number(this.id) || this.id

      const payload = isDoacao ? {
        campanhaId: campanhaIdNum,
        nome: this.form.nome,
        telefone: this.form.telefone,
        tipoItem: this.form.tipoItem,
        quantidade: this.form.quantidade,
        descricaoAdicional: this.form.descricaoAdicional
      } : {
        campanhaId: campanhaIdNum,
        nome: this.form.nome,
        telefone: this.form.telefone,
        disponibilidade: this.form.disponibilidade,
        atividadeDesejada: this.form.atividadeDesejada
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          const erro = await response.json().catch(() => ({}))
          throw new Error(erro.erro || erro.mensagem || `Erro HTTP ${response.status} ao registrar participação.`)
        }
        
        this.sucesso = true
      } catch (err) {
        this.erroEnvio = err.message
      } finally {
        this.enviando = false
      }
    }
  }
}
</script>