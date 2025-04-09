import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import NotesView from '../views/NotesView.vue'
import RegisterView from '../views/RegisterView.vue' // ⬅️ bunu ekle

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/notes', name: 'Notes', component: NotesView },
  { path: '/register', name: 'Register', component: RegisterView }, // ⬅️ bunu ekle
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
