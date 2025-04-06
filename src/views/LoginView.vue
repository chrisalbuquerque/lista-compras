<template>
  <BaseLayout>
    <v-card class="pa-5">
      <v-card-title class="text-h3 text-center justify-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="fazerLogin">
          <v-text-field
            v-model="email"
            label="E-mail"
            type="email"
            required
          />
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            required
          />
          <v-alert
            v-if="erro"
            type="error"
            class="mt-2"
            dense
          >
            {{ erro }}
          </v-alert>
          <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            block
          >
            Entrar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// campos do formulário
const email = ref('')
const senha = ref('')
const erro = ref('')
const router = useRouter()

// emissor de evento para App.vue
const emit = defineEmits(['login'])

const fazerLogin = () => {
  if (email.value === 'admin@teste.com' && senha.value === '123456') {
    erro.value = ''
    localStorage.setItem('logado', 'true')
    emit('login') // notifica App.vue para exibir AppBar
    router.push('/listas')
  } else {
    erro.value = 'E-mail ou senha inválidos.'
  }
}
</script>
