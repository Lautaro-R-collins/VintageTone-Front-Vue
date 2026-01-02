<template>
    <div
        class="flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white py-4 sm:py-0 px-6 sm:px-0">
        <router-link @click="$emit('link-clicked')" to="/"
            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
            Inicio
        </router-link>
        <a @click="$emit('link-clicked')"
            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
            Guitarras
        </a>
        <a @click="$emit('link-clicked')"
            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
            Amplificadores
        </a>
        <a @click="$emit('link-clicked')"
            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
            Efectos
        </a>
        <a @click="$emit('link-clicked')"
            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
            Accesorios
        </a>
        <a @click="$emit('link-clicked')"
            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer text-amber-500 font-black">
            Outlet
        </a>
    </div>
</template>

<script setup>
defineEmits(['link-clicked'])
</script>
