<template>
    <v-main>
      <v-container fluid class="py-4">
        <v-row justify="center" class="ma-0">
          <v-col cols="12" sm="10" md="8" lg="6" xl="4">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </template>
  
  <script setup>
  // Nada necessário aqui por enquanto
  </script>
  
  <style scoped>
  /* Removido min-height 100vh para evitar empurrar conteúdo pra baixo */
  </style>  