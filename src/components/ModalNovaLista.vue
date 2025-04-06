<!-- src/components/ModalNovaLista.vue -->
<template>
    <v-dialog v-model="mostrar" max-width="500">
      <v-card>
        <v-card-title class="text-h6">Criar Nova Lista</v-card-title>
        <v-card-text>
          <v-text-field v-model="nome" label="Nome da Lista" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="fechar">Cancelar</v-btn>
          <v-btn color="primary" @click="criar">Criar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: Boolean,
  })
  const emit = defineEmits(['update:modelValue', 'criar'])
  
  const mostrar = ref(props.modelValue)
  watch(() => props.modelValue, v => (mostrar.value = v))
  watch(mostrar, v => emit('update:modelValue', v))
  
  const nome = ref('')
  
  const criar = () => {
    if (nome.value.trim()) {
      emit('criar', nome.value.trim())
      nome.value = ''
      mostrar.value = false
    }
  }
  
  const fechar = () => {
    mostrar.value = false
  }
  </script>
  