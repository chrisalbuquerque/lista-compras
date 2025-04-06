<!-- src/views/MinhasComprasView.vue -->
<template>
  <WideLayout>
    <v-container class="pt-6 px-4">
      <v-row justify="center" v-if="listas && listas.length">
        <v-col
          v-for="(lista, index) in listas"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="pa-3">
            <v-card-title>{{ lista.nome }}</v-card-title>
            <v-card-subtitle class="text-caption grey--text">
              Atualizado em: {{ lista.dataAtualizacao }}
            </v-card-subtitle>

            <v-card-text>
              <div class="text-body-2 font-weight-medium mb-2">
                {{ comprados(lista).length }} item<span v-if="comprados(lista).length !== 1">s</span> comprado<span v-if="comprados(lista).length !== 1">s</span>
              </div>

              <template v-if="comprados(lista).length">
                <ul class="ma-0 pl-4">
                  <li v-for="(produto, i) in comprados(lista)" :key="i">
                    {{ produto.nome }}
                  </li>
                </ul>
              </template>
              <template v-else>
                Nenhum produto comprado ainda.
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <div v-else class="text-center text-subtitle-1 mt-5">
        Nenhuma lista encontrada.
      </div>

      <!-- Botão flutuante -->
      <v-btn
        icon
        color="primary"
        class="ma-4"
        style="position: fixed; bottom: 20px; right: 20px;"
        title="Adicionar nova lista"
        @click="mostrarModal = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <!-- Modal de criação de nova lista -->
      <ModalNovaLista v-model="mostrarModal" @criar="criarLista" />
    </v-container>
  </WideLayout>
</template>

<script setup>
import WideLayout from '@/layouts/WideLayout.vue'
import ModalNovaLista from '@/components/ModalNovaLista.vue'
import { ref } from 'vue'
import { listas } from '@/data/listas'
import { useRouter } from 'vue-router'

const mostrarModal = ref(false)
const router = useRouter()

const comprados = (lista) => {
  return lista.produtos.filter(p => p.comprado)
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