<template>
  <v-app>
    <v-main class="pa-6">
      <h2 class="mb-4">Notlarım</h2>

      <!-- Not ekleme/güncelleme formu -->
      <NoteForm
        :editingNote="editingNote"
        @noteAdded="fetchNotes"
        @editDone="onEditDone"
        class="mb-4"
      />

      <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

      <v-btn color="primary" class="mb-4" @click="logout">Çıkış Yap</v-btn>

      <!-- Notlar kart stiliyle listeleniyor -->
      <v-row dense>
        <v-col
          v-for="note in notes"
          :key="note.noteId"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card class="pa-4 d-flex flex-column justify-space-between" elevation="2">
            <div>
              <div class="text-subtitle-1 font-weight-medium">{{ note.content }}</div>
              <div class="text-caption text-grey mt-1">{{ formatDate(note.createdAt) }}</div>
            </div>

            <div class="d-flex justify-end mt-4 gap-2">
              <v-btn color="blue-darken-2" variant="outlined" @click="editNote(note)">Güncelle</v-btn>
              <v-btn color="red-darken-1" variant="outlined" @click="deleteNote(note.noteId)">Sil</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import NoteForm from '../components/NoteForm.vue'
import { API_BASE_URL } from '../services/api'

const router = useRouter()
const notes = ref([])
const error = ref('')
const user = ref(null)
const editingNote = ref(null)

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (!userData) {
    router.push('/')
    return
  }

  user.value = JSON.parse(userData)
  fetchNotes()
})

const fetchNotes = async () => {
  error.value = ''
  try {
    const res = await axios.get(`${API_BASE_URL}/Note/${user.value.userId}`)
    notes.value = res.data
  } catch (err) {
    error.value = 'Notlar yüklenemedi.'
  }
}

const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/Note/${id}`)
    fetchNotes()
  } catch {
    error.value = 'Not silinemedi.'
  }
}

const logout = () => {
  localStorage.removeItem('user')
  router.push('/')
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleString('tr-TR')
}

const editNote = (note) => {
  editingNote.value = { ...note } // Notu kopyalayarak veriyoruz (reactive uyumluluğu için)
}

const onEditDone = () => {
  editingNote.value = null
  fetchNotes()
}
</script>
