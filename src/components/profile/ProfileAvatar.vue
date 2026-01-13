<script setup>
import { ref } from 'vue'
import { User, Camera, Loader2 } from 'lucide-vue-next'

const props = defineProps({
  avatarUrl: {
    type: String,
    default: null
  },
  isUploading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['upload'])

const fileInput = ref(null)

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    emit('upload', file)
  }
  // Reset input so the same file can be selected again if needed
  event.target.value = ''
}
</script>

<template>
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
</template>
