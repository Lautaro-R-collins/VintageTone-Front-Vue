<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { ref, computed } from 'vue'
import { BASE_URL } from '../services/api'

// Components
import ProfileHeader from '../components/profile/ProfileHeader.vue'
import ProfileStats from '../components/profile/ProfileStats.vue'
import ProfileDetails from '../components/profile/ProfileDetails.vue'

const authStore = useAuthStore()
const router = useRouter()
const isUploading = ref(false)

const handleLogout = async () => {
  await authStore.logout()
  toast.success('Sesión cerrada correctamente')
  router.push('/')
}

const handleFileUpload = async (file) => {
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
      <ProfileHeader 
        v-if="authStore.user"
        :user="authStore.user"
        :avatar-url="avatarUrl"
        :is-uploading="isUploading"
        @logout="handleLogout"
        @upload="handleFileUpload"
      />

      <!-- Stats/Quick Actions Grid -->
      <ProfileStats />

      <!-- Detailed Info Sections -->
      <ProfileDetails 
        v-if="authStore.user"
        :user="authStore.user" 
      />
    </div>
  </div>
</template>
