<script setup>
import { computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
})

const backgroundImage = computed(() => {
    return props.image || '/assets/home/HeaderImg.webp' // Fallback
})
</script>

<template>
    <section class="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
            <img 
                :src="backgroundImage" 
                :alt="title"
                class="w-full h-full object-cover opacity-50 scale-105"
            >
            <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent"></div>
            <div class="absolute inset-0 bg-slate-950/20"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 text-center px-6 max-w-4xl">
            <h1 class="text-4xl md:text-6xl font-black text-white uppercase tracking-[-0.02em] font-logo italic leading-tight mb-4 drop-shadow-2xl">
                {{ title }}
            </h1>
            <p v-if="subtitle" class="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs drop-shadow-lg">
                {{ subtitle }}
            </p>
        </div>
    </section>
</template>

<style scoped>
h1 {
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}
</style>
