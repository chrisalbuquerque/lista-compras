<!-- src/views/ListaView.vue -->
<template>
  <WideLayout>
    <v-container class="pt-5 px-4">
      <v-row justify="center" align="start">
        <v-col cols="12" class="text-center mb-6">
          <h1 class="text-h5">Minhas Listas</h1>
        </v-col>

        <v-row>
          <v-col v-for="lista in listas" :key="lista.id" cols="12" sm="6" md="4">
            <v-card @click="irParaDetalhe(lista.id)" class="hoverable">
              <v-card-title>{{ lista.nome }}</v-card-title>
              <v-card-subtitle>
                Atualizado em: {{ formatarData(lista.dataAtualizacao) }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <v-tooltip location="top">
          <template #activator="{ props }">
            <v-btn v-bind="props" icon color="primary" class="fab" @click="mostrarModal = true">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Criar nova lista</span>
        </v-tooltip>

        <ModalNovaLista v-model="mostrarModal" @criar="criarLista" />
      </v-row>
    </v-container>
  </WideLayout>
</template>

<script setup>
import WideLayout from '@/layouts/WideLayout.vue'
import ModalNovaLista from '@/components/ModalNovaLista.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { listas } from '@/data/listas'

const router = useRouter()
const mostrarModal = ref(false)

const formatarData = (dataIso) => {
  const [ano, mes, dia] = dataIso.split('-')
  return `${dia}/${mes}/${ano}`
}

const irParaDetalhe = (id) => {
  router.push(`/lista/${id}`)
}

const criarLista = (nome) => {
  const novaLista = {
    id: Date.now(),
    nome,
    produtos: [],
    dataAtualizacao: new Date().toISOString().split('T')[0],
  }
  listas.push(novaLista)
  router.push(`/lista/${novaLista.id}`)
}
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

.hoverable {
  cursor: pointer;
  transition: 0.2s;
}

.hoverable:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
</style>
