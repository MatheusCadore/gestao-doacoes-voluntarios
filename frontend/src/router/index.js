import { createRouter, createWebHistory } from 'vue-router'
import CampanhasView from '../views/CampanhasView.vue'
import DetalhesCampanhaView from '../views/DetalhesCampanhaView.vue'
import AjudarView from '../views/AjudarView.vue'
import DoacoesView from '../views/DoacoesView.vue'
import VoluntariosView from '../views/VoluntariosView.vue'
import NaoEncontradaView from '../views/NaoEncontradaView.vue'

const routes = [
  { path: '/', redirect: '/campanhas' },
  { path: '/campanhas', name: 'Campanhas', component: CampanhasView },
  { path: '/campanhas/:id', name: 'DetalhesCampanha', component: DetalhesCampanhaView, props: true },
  { path: '/ajudar/:id', name: 'Ajudar', component: AjudarView, props: true },
  { path: '/doacoes', name: 'Doacoes', component: DoacoesView },
  { path: '/voluntarios', name: 'Voluntarios', component: VoluntariosView },
  // Qualquer outro endereço cai na página de "não encontrada"
  { path: '/:pathMatch(.*)*', name: 'NaoEncontrada', component: NaoEncontradaView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router