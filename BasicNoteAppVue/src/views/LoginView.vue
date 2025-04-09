<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="min-height: 100vh">
      <v-card class="pa-6" max-width="400">
        <h2 class="mb-4 text-center">Giriş Yap</h2>

        <v-text-field
          label="Kullanıcı Adı"
          v-model="username"
          prepend-icon="mdi-account"
          autocomplete="username"
        />
        <v-text-field
          label="Şifre"
          type="password"
          v-model="password"
          prepend-icon="mdi-lock"
          autocomplete="current-password"
        />

        <v-btn color="primary" block class="mt-4" @click="login">Giriş Yap</v-btn>

        <v-btn variant="text" class="mt-2" @click="goRegister">Hesabın yok mu? Kayıt Ol</v-btn>

        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
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
const router = useRouter()

const login = async () => {
  error.value = ''
  try {
    const res = await axios.post(`${API_BASE_URL}/User/login`, {
      username: username.value,
      password: password.value,
    })

    // Başarılı giriş: user'ı localStorage'a kaydet
    localStorage.setItem('user', JSON.stringify(res.data))
    router.push('/notes')
  } catch (err) {
    error.value = err.response?.data || 'Giriş başarısız.'
  }
}

const goRegister = () => {
  router.push('/register')
}
</script>
