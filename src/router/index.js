// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import ListasView from '@/views/ListasView.vue'
import ListaDetalheView from '@/views/ListaDetalheView.vue'
import MinhasComprasView from '@/views/MinhasComprasView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/listas', component: ListasView },
  { path: '/lista/:id', component: ListaDetalheView },
  { path: '/minhas-compras', component: MinhasComprasView },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
