<template>
    <div
        class="flex flex-col sm:flex-row items-center justify-between w-full text-[11px] font-bold uppercase tracking-[0.2em] text-white py-4 sm:py-0 px-6 sm:px-0">
        
        <!-- Left Group: Categories -->
        <div class="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <router-link @click="$emit('link-clicked')" to="/"
                class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
                Inicio
            </router-link>
            <router-link @click="$emit('link-clicked')" to="/"
                class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
                Guitarras
            </router-link>
            <router-link @click="$emit('link-clicked')" to="/"
                class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
                Amplificadores
            </router-link>
            <router-link @click="$emit('link-clicked')" to="/"
                class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
                Efectos
            </router-link>
            <router-link @click="$emit('link-clicked')" to="/"
                class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
                Accesorios
            </router-link>
            <router-link @click="$emit('link-clicked')" to="/"
                class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer text-amber-500 font-black">
                Outlet
            </router-link>
        </div>

        <!-- Right Group: Information -->
        <div class="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto border-t border-white/5 sm:border-none mt-2 sm:mt-0 pt-2 sm:pt-0">
            <router-link @click="$emit('link-clicked')" to="/about"
                class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
                Sobre nosotros
            </router-link>
            <router-link @click="$emit('link-clicked')" to="/contact"
                class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
                Contacto
            </router-link>
        </div>
    </div>
</template>

<script setup>
defineEmits(['link-clicked'])
</script>
