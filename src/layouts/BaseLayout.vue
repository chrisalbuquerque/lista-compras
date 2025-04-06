<template>
    <v-app>
      <v-main>
        <v-container fluid class="pa-4 fill-height">
          <v-row
            align="center"
            justify="center"
            class="ma-0"
          >
            <v-col
              cols="12"
              sm="10"
              md="8"
              lg="6"
              xl="4"
            >
              <slot />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  // Nenhum script necessário aqui por enquanto
  </script>
  
  <style scoped>
  .fill-height {
    min-height: 100vh;
  }
  </style>  