<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="min-height: 100vh">
      <v-card class="pa-6" max-width="400">
        <h2 class="mb-4 text-center">Kayıt Ol</h2>

        <v-text-field label="Kullanıcı Adı" v-model="username" prepend-icon="mdi-account" />
        <v-text-field label="Şifre" type="password" v-model="password" prepend-icon="mdi-lock" />

        <v-btn color="primary" block class="mt-4" @click="register">Kayıt Ol</v-btn>

        <v-btn variant="text" class="mt-2" @click="goLogin">Zaten hesabın var mı? Giriş Yap</v-btn>

        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
        <v-alert v-if="success" type="success" class="mt-4">{{ success }}</v-alert>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { API_BASE_URL } from '../services/api'

const username = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const router = useRouter()

const register = async () => {
  error.value = ''
  success.value = ''
  try {
    await axios.post(`${API_BASE_URL}/User/register`, {
      username: username.value,
      password: password.value,
    })
    success.value = 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.'
  } catch (err) {
    error.value = err.response?.data || 'Kayıt başarısız.'
  }
}

const goLogin = () => {
  router.push('/')
}
</script>
