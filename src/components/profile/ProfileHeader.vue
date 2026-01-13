<script setup>
import { User, Mail, ShieldCheck, LogOut } from 'lucide-vue-next'
import ProfileAvatar from './ProfileAvatar.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  avatarUrl: {
    type: String,
    default: null
  },
  isUploading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['logout', 'upload'])

const handleLogout = () => {
  emit('logout')
}

const handleUpload = (file) => {
  emit('upload', file)
}
</script>

<template>
  <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 overflow-hidden relative group">
    <div class="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <User :size="200" />
    </div>
    
    <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
      <!-- Avatar Section -->
      <ProfileAvatar 
        :avatar-url="avatarUrl" 
        :is-uploading="isUploading" 
        @upload="handleUpload"
      />

      <!-- User Info -->
      <div class="flex-1 text-center md:text-left space-y-2">
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <h1 class="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">
            {{ user?.userName }}
          </h1>
          <span v-if="user?.isAdmin" 
            class="bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
            <ShieldCheck :size="12" /> Admin
          </span>
        </div>
        <p class="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-bold uppercase tracking-widest text-xs">
          <Mail :size="14" /> {{ user?.email }}
        </p>
      </div>

      <!-- Logout Button Mobile/Desktop -->
      <button @click="handleLogout" 
        class="flex items-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all cursor-pointer">
        <LogOut :size="16" /> Cerrar Sesión
      </button>
    </div>
  </div>
</template>
