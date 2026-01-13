<script setup>
import { LogIn, UserPlus, LogOut, Settings, LayoutDashboard } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import UserAvatar from './UserAvatar.vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  const elem = document.activeElement
  if (elem) {
    elem.blur()
  }
}

const handleClick = () => {
  const elem = document.activeElement
  if (elem) {
    elem.blur()
  }
}
</script>

<template>
  <div class="dropdown dropdown-end cursor-pointer">
    <label tabindex="0" class="cursor-pointer">
      <UserAvatar />
    </label>

    <ul tabindex="0"
      class="dropdown-content z-50 menu p-2 shadow-2xl bg-white rounded-xl w-52 mt-4 border border-slate-100 space-y-1">
      
      <!-- Si el usuario está autenticado -->
      <template v-if="authStore.isAuthenticated">
        <li>
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Sesión Iniciada</p>
          <p class="text-xs font-bold text-slate-900 truncate">Hola, {{ authStore.user?.userName }}</p>
        </li>
        <li v-if="authStore.user?.isAdmin">
          <router-link to="/admin" @click="handleClick"
            class="flex items-center gap-3 py-3 px-4 rounded-xl bg-slate-950 text-amber-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-slate-950 transition-all group">
            <LayoutDashboard :size="18" class="group-hover:scale-110 transition-transform" />
            Panel Admin
          </router-link>
        </li>
        <li>
          <router-link to="/profile" @click="handleClick"
            class="flex items-center gap-3 py-3 px-4 rounded-xl text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all group">
            <Settings :size="18" class="group-hover:rotate-45 transition-transform" />
            Mi Perfil
          </router-link>
        </li>
        <li>
          <button @click="handleLogout"
            class="flex items-center gap-3 py-3 px-4 rounded-xl text-red-600 font-bold text-xs uppercase tracking-widest hover:bg-red-50 transition-all group w-full text-left">
            <LogOut :size="18" class="group-hover:-translate-x-1 transition-transform" />
            Cerrar Sesión
          </button>
        </li>
      </template>

      <!-- Si no está autenticado -->
      <template v-else>
        <li>
          <router-link to="/login" @click="handleClick"
            class="flex items-center gap-3 py-3 px-4 rounded-xl text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all group">
            <LogIn :size="18" class="group-hover:translate-x-1 transition-transform" />
            Iniciar Sesión
          </router-link>
        </li>
        <li>
          <router-link to="/register" @click="handleClick"
            class="flex items-center gap-3 py-3 px-4 rounded-xl text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all group">
            <UserPlus :size="18" class="group-hover:scale-110 transition-transform" />
            Registrarse
          </router-link>
        </li>
      </template>
    </ul>
  </div>
</template>
