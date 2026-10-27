<template>
  <div class="container py-4">
    <div class="mb-3">
      <router-link :to="`/campanhas/${id}`" class="btn btn-outline-secondary btn-sm">
        ← Voltar aos Detalhes
      </router-link>
    </div>

    <div class="card shadow border-0 p-4 mx-auto" style="max-width: 600px;">
      <h2 class="h4 fw-bold text-primary mb-3">Registrar Participação</h2>

      <!-- Estados do carregamento da campanha -->
      <div v-if="carregando" class="text-center py-4">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else-if="erroCampanha" class="alert alert-danger" role="alert">
        {{ erroCampanha }}
      </div>

      <template v-else>
        <div class="alert alert-light border mb-4">
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
            <label for="tipoAjuda" class="form-label fw-bold">Tipo de ajuda *</label>
            <select id="tipoAjuda" v-model="form.tipoAjuda" class="form-select" required>
              <option value="doacao">Doação</option>
              <option value="voluntario" :disabled="!campanha.necessitaVoluntarios">Voluntariado</option>
            </select>
          </div>

          <!-- Campos Comuns -->
          <div class="mb-3">
            <label for="nome" class="form-label">Nome completo *</label>
            <input id="nome" type="text" v-model="form.nome" class="form-control" placeholder="Digite seu nome completo" required />
          </div>

          <div class="mb-3">
            <label for="telefone" class="form-label">Telefone para contato *</label>
            <input id="telefone" type="text" v-model="form.telefone" class="form-control" placeholder="(00) 00000-0000" required />
          </div>

          <!-- Campos Exclusivos de Doação -->
          <template v-if="form.tipoAjuda === 'doacao'">
            <div class="mb-3">
              <label for="tipoItem" class="form-label">Tipo de item *</label>
              <select id="tipoItem" v-model="form.tipoItem" class="form-select" required>
                <option disabled value="">Selecione o item</option>
                <option v-for="item in campanha.itensNecessarios" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="quantidade" class="form-label">Quantidade *</label>
              <input id="quantidade" type="number" v-model.number="form.quantidade" class="form-control" min="1" required />
            </div>

            <div class="mb-3">
              <label for="descricaoAdicional" class="form-label">Descrição adicional</label>
              <textarea id="descricaoAdicional" v-model="form.descricaoAdicional" class="form-control" placeholder="Descreva os itens que deseja doar (ex: 10 garrafas de água)"></textarea>
            </div>
          </template>

          <!-- Campos Exclusivos de Voluntariado -->
          <template v-if="form.tipoAjuda === 'voluntario'">
            <div class="mb-3">
              <label for="disponibilidade" class="form-label">Disponibilidade *</label>
              <select id="disponibilidade" v-model="form.disponibilidade" class="form-select" required>
                <option disabled value="">Selecione a disponibilidade</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Integral">Integral</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="atividadeDesejada" class="form-label">Atividade desejada *</label>
              <select id="atividadeDesejada" v-model="form.atividadeDesejada" class="form-select" required>
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
      </template>
    </div>
  </div>
</template>

<script>
import { API_URL } from '../services/api.js'

export default {
  name: 'AjudarView',
  props: ['id'],
  data() {
    return {
      campanha: null,
      carregando: true,
      erroCampanha: null,
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
      const response = await fetch(`${API_URL}/campanhas/${this.id}`)
      if (!response.ok) {
        if (response.status === 404) throw new Error('Campanha não encontrada.')
        throw new Error('Erro ao buscar a campanha.')
      }
      this.campanha = await response.json()

      // Se a campanha não precisa de voluntários, o formulário começa como doação
      if (!this.campanha.necessitaVoluntarios) this.form.tipoAjuda = 'doacao'
    } catch (err) {
      this.erroCampanha = err.message
    } finally {
      this.carregando = false
    }
  },
  methods: {
    // Retorna a mensagem do primeiro erro encontrado, ou null se estiver tudo certo
    validarFormulario() {
      if (this.form.nome.trim() === '') return 'Informe seu nome.'

      const digitos = this.form.telefone.replace(/\D/g, '')
      if (digitos.length < 10 || digitos.length > 11) return 'Telefone deve ter 10 ou 11 dígitos (com DDD).'

      if (this.form.tipoAjuda === 'doacao') {
        if (this.form.tipoItem === '') return 'Selecione o tipo de item.'
        if (!Number.isInteger(this.form.quantidade) || this.form.quantidade < 1) return 'Quantidade deve ser um número inteiro maior que zero.'
      } else {
        if (this.form.disponibilidade === '') return 'Selecione sua disponibilidade.'
        if (this.form.atividadeDesejada === '') return 'Selecione a atividade desejada.'
      }

      return null
    },
    async enviarFormulario() {
      this.erroEnvio = this.validarFormulario()
      if (this.erroEnvio) return

      this.enviando = true

      const isDoacao = this.form.tipoAjuda === 'doacao'
      const endpoint = isDoacao ? `${API_URL}/doacoes` : `${API_URL}/voluntarios`

      const payload = isDoacao ? {
        campanhaId: Number(this.id),
        nome: this.form.nome,
        telefone: this.form.telefone,
        tipoItem: this.form.tipoItem,
        quantidade: this.form.quantidade,
        descricaoAdicional: this.form.descricaoAdicional
      } : {
        campanhaId: Number(this.id),
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
          throw new Error(erro.erro || `Erro HTTP ${response.status} ao registrar participação.`)
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
