<script setup>
defineProps({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="flex flex-col items-center group">
        <div class="relative w-full aspect-square overflow-hidden rounded-2xl mb-4 border-b-4 border-amber-500/0 group-hover:border-amber-500 transition-all duration-300">
            <img 
                :src="image" 
                :alt="name" 
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
        </div>
        <h3 class="text-xl font-black text-slate-900 uppercase italic tracking-tighter text-center">
            {{ name }}
        </h3>
        <p class="text-slate-500 text-xs font-black uppercase tracking-widest mt-1 text-center">
            {{ role }}
        </p>
    </div>
</template>
