<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    images: {
        type: Array,
        required: true,
        default: () => []
    }
})

const activeImage = ref(props.images[0] || '')

watch(() => props.images, (newImages) => {
    if (newImages && newImages.length > 0) {
        activeImage.value = newImages[0]
    }
}, { immediate: true })
</script>

<template>
    <div class="space-y-6">
        <!-- Main Image -->
        <div class="aspect-4/5 md:aspect-square bg-slate-100 rounded-3xl overflow-hidden relative group border border-slate-200 shadow-inner">
            <img 
                :src="activeImage" 
                alt="Product View" 
                class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
        </div>

        <!-- Thumbnails -->
        <div class="grid grid-cols-4 gap-4">
            <button 
                v-for="(img, index) in images" 
                :key="index"
                @click="activeImage = img"
                class="aspect-square rounded-2xl overflow-hidden border-2 transition-all p-1"
                :class="activeImage === img ? 'border-amber-500 bg-white ring-4 ring-amber-500/10' : 'border-slate-100 bg-slate-50 hover:border-slate-300'"
            >
                <img :src="img" class="w-full h-full object-cover rounded-xl" />
            </button>
        </div>
    </div>
</template>
