<script setup>
import { User, LogIn, UserPlus } from 'lucide-vue-next'

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
      <User :size="25" class="text-slate-900" />
    </label>

    <ul tabindex="0"
      class="dropdown-content z-50 menu p-2 shadow-2xl bg-white rounded-xl w-52 mt-4 border border-slate-100 space-y-1">
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
    </ul>
  </div>
</template>
