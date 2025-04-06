<!-- src/App.vue -->
<template>
  <v-app>
    <!-- AppBar visível apenas se estiver autenticado -->
    <v-app-bar
      v-if="autenticado"
      app
      color="primary"
      dark
      :elevation="1"
    >
      <v-toolbar-title>Lista de Compras</v-toolbar-title>
      <v-spacer />
      <v-btn text @click="goTo('/listas')">Listas</v-btn>
      <v-btn text @click="goTo('/minhas-compras')">Minhas Compras</v-btn>
      <v-btn icon @click="logout" title="Sair">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Conteúdo da aplicação -->
    <v-main>
      <router-view @login="checarLogin" />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const autenticado = ref(false)

const checarLogin = () => {
  autenticado.value = localStorage.getItem('logado') === 'true'
}

const goTo = (path) => {
  router.push(path)
}

const logout = () => {
  localStorage.removeItem('logado')
  autenticado.value = false
  router.push('/login')
}

onMounted(() => {
  checarLogin()
})
</script>
