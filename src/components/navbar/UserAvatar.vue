<script setup>
import { User } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'
import { computed } from 'vue'
import { BASE_URL } from '../../services/api'

const authStore = useAuthStore()

const firstLetter = computed(() => {
  return authStore.user?.userName ? authStore.user.userName.charAt(0).toUpperCase() : ''
})

const avatarUrl = computed(() => {
  const avatar = authStore.user?.avatar
  if (!avatar) return null
  if (avatar.startsWith('http') || avatar.startsWith('data:')) {
    return avatar
  }
  const cleanPath = avatar.startsWith('/') ? avatar.substring(1) : avatar
  return `${BASE_URL.replace(/\/$/, '')}/${cleanPath}`
})

const avatarColors = [
  'bg-slate-900',
]

const avatarColor = computed(() => {
  const charCode = firstLetter.value.charCodeAt(0) || 0
  return avatarColors[charCode % avatarColors.length]
})
</script>

<template>
  <div v-if="authStore.isAuthenticated" class="avatar" :class="{ 'placeholder': !avatarUrl }">
    <div :class="[
      'ring-amber-500 ring-offset-base-100 w-10 rounded-full',
      !avatarUrl ? avatarColor : ''
    ]">
      <img v-if="avatarUrl" :src="avatarUrl" :alt="authStore.user.userName" />
      <span v-else class="text-white font-black text-sm uppercase">{{ firstLetter }}</span>
    </div>
  </div>

  <div v-else class="hover:scale-110 transition-transform">
    <User :size="25" class="text-slate-900" />
  </div>
</template>

<style scoped>
.avatar.placeholder > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
