<template>
  <v-container class="py-6">
    <v-row class="justify-center mb-4">
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-6">{{ lista.nome }}</h1>

        <v-row v-for="(produto, index) in lista.produtos" :key="index" align="center" class="mb-3">
          <v-col cols="1">
            <v-checkbox v-model="produto.comprado" hide-details @change="calcularTotais" />
          </v-col>

          <v-col cols="7">
            <span :class="{ 'text-decoration-line-through': produto.comprado }">
              {{ produto.nome }} - R$ {{ produto.preco.toFixed(2) }}
              <strong class="ml-2">x{{ produto.quantidade }}</strong>
            </span>
          </v-col>

          <v-col cols="4" class="text-right">
            <v-btn icon @click="editarProduto(index)" :title="'Editar ' + produto.nome">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="removerProduto(index)" :title="'Remover ' + produto.nome">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-6">
          <v-col cols="12" class="text-right">
            <div class="mb-2">Total da Lista: <strong>R$ {{ total.toFixed(2) }}</strong></div>
            <div class="mb-4">Total Comprado: <strong>R$ {{ totalComprado.toFixed(2) }}</strong></div>
            <v-btn color="primary" @click="mostrarModalAdicionar = true">
              <v-icon left>mdi-plus</v-icon>
              Adicionar Produto
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Modal de Edição -->
    <v-dialog v-model="mostrarModalEdicao" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Editar Produto</v-card-title>
        <v-card-text>
          <v-text-field v-model="produtoEditando.nome" label="Nome do Produto" />
          <v-text-field v-model.number="produtoEditando.preco" label="Preço" type="number" />
          <v-text-field v-model.number="produtoEditando.quantidade" label="Quantidade" type="number" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="mostrarModalEdicao = false">Cancelar</v-btn>
          <v-btn color="primary" @click="salvarEdicao">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Adição -->
    <v-dialog v-model="mostrarModalAdicionar" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Adicionar Produto</v-card-title>
        <v-card-text>
          <v-text-field v-model="novoProduto.nome" label="Nome do Produto" />
          <v-text-field v-model.number="novoProduto.preco" label="Preço" type="number" />
          <v-text-field v-model.number="novoProduto.quantidade" label="Quantidade" type="number" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="mostrarModalAdicionar = false">Cancelar</v-btn>
          <v-btn color="primary" @click="adicionarProduto">Adicionar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { listas, atualizarDataLista } from '@/data/listas'

const route = useRoute()
const id = parseInt(route.params.id)
const lista = ref(listas.find(l => l.id === id))

const mostrarModalEdicao = ref(false)
const mostrarModalAdicionar = ref(false)
const produtoEditando = ref({})
const indiceEditando = ref(null)
const novoProduto = ref({ nome: '', preco: 0, quantidade: 1, comprado: false })

const editarProduto = (index) => {
  produtoEditando.value = { ...lista.value.produtos[index] }
  indiceEditando.value = index
  mostrarModalEdicao.value = true
}

const salvarEdicao = () => {
  lista.value.produtos[indiceEditando.value] = { ...produtoEditando.value }
  mostrarModalEdicao.value = false
  atualizarDataLista(lista.value.id)
  calcularTotais()
}

const adicionarProduto = () => {
  lista.value.produtos.push({ ...novoProduto.value })
  novoProduto.value = { nome: '', preco: 0, quantidade: 1, comprado: false }
  mostrarModalAdicionar.value = false
  atualizarDataLista(lista.value.id)
  calcularTotais()
}

const removerProduto = (index) => {
  lista.value.produtos.splice(index, 1)
  atualizarDataLista(lista.value.id)
  calcularTotais()
}

const total = ref(0)
const totalComprado = ref(0)

const calcularTotais = () => {
  total.value = lista.value.produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0)
  totalComprado.value = lista.value.produtos
    .filter(p => p.comprado)
    .reduce((acc, p) => acc + (p.preco * p.quantidade), 0)
}

calcularTotais()
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
</style>