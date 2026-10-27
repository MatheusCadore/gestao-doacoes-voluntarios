<template>
  <div class="container py-5 text-center">
    <h1 class="display-6 fw-bold">Página não encontrada</h1>
    <p class="text-muted">O endereço acessado não existe.</p>
    <router-link to="/campanhas" class="btn btn-primary">Voltar para campanhas</router-link>
  </div>
</template>

<script>
export default {
  name: 'NaoEncontradaView'
}
</script>
