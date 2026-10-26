import { createRouter, createWebHistory } from 'vue-router'
import CampanhasView from '../views/CampanhasView.vue'
import DetalhesCampanhaView from '../views/DetalhesCampanhaView.vue'
import AjudarView from '../views/AjudarView.vue'

const routes = [
  { path: '/', redirect: '/campanhas' },
  { path: '/campanhas', name: 'Campanhas', component: CampanhasView },
  { path: '/campanhas/:id', name: 'DetalhesCampanha', component: DetalhesCampanhaView, props: true },
  { path: '/ajudar/:id', name: 'Ajudar', component: AjudarView, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router