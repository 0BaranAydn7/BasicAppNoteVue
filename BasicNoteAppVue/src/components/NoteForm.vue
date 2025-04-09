<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="content"
      label="Yeni not yazın"
      outlined
      dense
      class="mb-2"
    />
    <v-btn color="success" type="submit" block>
      {{ props.editingNote ? 'Güncelle' : 'Ekle' }}
    </v-btn>
  </v-form>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { API_BASE_URL } from '../services/api'

const props = defineProps({
  editingNote: Object,
})

const emit = defineEmits(['noteAdded', 'editDone'])

const content = ref('')

// Düzenlenecek not varsa input'a getir
watch(
  () => props.editingNote,
  (newVal) => {
    content.value = newVal ? newVal.content : ''
  },
  { immediate: true } // ✅ Bu çok önemli!
)

const handleSubmit = async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (!content.value.trim()) return

  try {
    if (props.editingNote) {
      // Not güncelle
      await axios.put(`${API_BASE_URL}/Note/${props.editingNote.noteId}`, {
        content: content.value,
        userId: user.userId,
      })
      emit('editDone')
    } else {
      // Yeni not ekle
      await axios.post(`${API_BASE_URL}/Note`, {
        content: content.value,
        userId: user.userId,
      })
      emit('noteAdded')
    }

    content.value = ''
  } catch (err) {
    console.error('Hata:', err)
  }
}
</script>
