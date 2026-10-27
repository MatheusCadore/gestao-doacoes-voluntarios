<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-white border-bottom">
      <div class="container d-flex flex-wrap gap-3">
        <router-link class="navbar-brand fw-bold" to="/campanhas">SOS Enchentes</router-link>
        <div class="d-flex flex-wrap gap-3">
          <router-link to="/campanhas">Campanhas</router-link>
          <router-link to="/doacoes">Doações</router-link>
          <router-link to="/voluntarios">Voluntários</router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
