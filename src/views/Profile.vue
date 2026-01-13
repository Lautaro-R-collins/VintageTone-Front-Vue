<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { User, Mail, ShieldCheck, LogOut, Package, Heart, History, Camera, Loader2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { ref, computed } from 'vue'
import { BASE_URL } from '../services/api'

const authStore = useAuthStore()
const router = useRouter()
const fileInput = ref(null)
const isUploading = ref(false)

const handleLogout = async () => {
  await authStore.logout()
  toast.success('Sesión cerrada correctamente')
  router.push('/')
}

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    toast.error('Por favor selecciona una imagen válida')
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    toast.error('La imagen es demasiado grande (máx 2MB)')
    return
  }

  isUploading.value = true
  const result = await authStore.uploadAvatar(file)
  isUploading.value = false

  if (result.success) {
    toast.success('Foto de perfil actualizada')
  } else {
    toast.error(result.message)
  }
}

const avatarUrl = computed(() => {
  const avatar = authStore.user?.avatar
  if (!avatar) return null
  if (avatar.startsWith('http') || avatar.startsWith('data:')) {
    return avatar
  }
  const cleanPath = avatar.startsWith('/') ? avatar.substring(1) : avatar
  return `${BASE_URL.replace(/\/$/, '')}/${cleanPath}`
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Header -->
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 overflow-hidden relative group">
        <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <User :size="200" />
        </div>
        
        <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <!-- Avatar Section -->
          <div class="relative">
            <input 
              type="file" 
              ref="fileInput" 
              class="hidden" 
              accept="image/*"
              @change="handleFileUpload"
            />
            <div class="w-32 h-32 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-500 overflow-hidden border-4 border-slate-50 relative">
              <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar" class="w-full h-full object-cover" />
              <User v-else :size="48" />
              
              <!-- Loading Overlay -->
              <div v-if="isUploading" class="absolute inset-0 bg-black/60 flex items-center justify-center">
                <Loader2 :size="24" class="text-amber-500 animate-spin" />
              </div>
            </div>
            <button 
              type="button"
              @click.stop="triggerFileInput"
              :disabled="isUploading"
              class="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-2 rounded-xl shadow-lg hover:scale-110 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed z-20">
              <Camera v-if="!isUploading" :size="16" />
              <Loader2 v-else :size="16" class="animate-spin" />
            </button>
          </div>

          <!-- User Info -->
          <div class="flex-1 text-center md:text-left space-y-2">
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <h1 class="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">
                {{ authStore.user?.userName }}
              </h1>
              <span v-if="authStore.user?.isAdmin" 
                class="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck :size="12" /> Admin
              </span>
            </div>
            <p class="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs">
              <Mail :size="14" /> {{ authStore.user?.email }}
            </p>
          </div>

          <!-- Logout Button Mobile/Desktop -->
          <button @click="handleLogout" 
            class="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all cursor-pointer">
            <LogOut :size="16" /> Cerrar Sesión
          </button>
        </div>
      </div>

      <!-- Stats/Quick Actions Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <router-link to="/checkout" class="bg-white p-6 rounded-3xl border border-slate-100 hover:border-amber-500 transition-all group">
          <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-amber-950 transition-colors">
            <Package :size="24" />
          </div>
          <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-xl">Mis Pedidos</h3>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Gestiona tus compras</p>
        </router-link>

        <router-link to="/favorites" class="bg-white p-6 rounded-3xl border border-slate-100 hover:border-amber-500 transition-all group">
          <div class="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
            <Heart :size="24" />
          </div>
          <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-xl">Favoritos</h3>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Tus tesoros guardados</p>
        </router-link>

        <div class="bg-white p-6 rounded-3xl border border-slate-100 hover:border-amber-500 transition-all group">
          <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <History :size="24" />
          </div>
          <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-xl">Historial</h3>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Vistos recientemente</p>
        </div>
      </div>

      <!-- Detailed Info Sections (Placeholders) -->
      <div class="space-y-6">
        <div class="bg-white rounded-3xl p-8 border border-slate-100">
          <h2 class="text-2xl font-black text-slate-950 uppercase italic tracking-tighter mb-6 flex items-center gap-3">
            Detalles de la Cuenta
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-4">
              <div>
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Nombre de Usuario</label>
                <p class="font-bold text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-100">{{ authStore.user?.userName }}</p>
              </div>
              <div>
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">ID de Usuario</label>
                <p class="font-bold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs break-all">{{ authStore.user?.id }}</p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Tipo de Cuenta</label>
                <p class="font-bold text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {{ authStore.user?.isAdmin ? 'Administrador' : 'Cliente Estándar' }}
                </p>
              </div>
              <div class="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                <p class="text-amber-800 text-xs font-bold uppercase tracking-widest mb-2 italic">¿Necesitas ayuda?</p>
                <p class="text-amber-900/70 text-sm leading-relaxed">Si necesitas cambiar tus datos o tienes problemas con tu cuenta, contacta con nuestro soporte.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
