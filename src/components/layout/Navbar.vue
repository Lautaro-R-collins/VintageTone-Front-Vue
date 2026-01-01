<script setup>
import { ref } from 'vue'
import { Search, User, Menu as MenuIcon, X, ChevronDown } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
    <header class="sticky top-0 z-50">
        <!-- Main Navbar: Logo & Actions -->
        <nav
            class="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-opacity-95">
            <div class="flex items-center">
                <router-link to="/" class="flex flex-col items-center cursor-pointer no-underline group">
                    <!-- Desktop Logo -->
                    <span
                        class="hidden sm:block text-3xl font-bold text-slate-950 tracking-[-0.05em] leading-none font-logo italic">
                        VintageTone
                    </span>
                    <!-- Mobile Logo -->
                    <span
                        class="block sm:hidden text-3xl font-bold text-slate-950 tracking-[-0.05em] leading-none font-logo italic">
                        VT
                    </span>
                </router-link>
            </div>

            <div class="flex items-center space-x-4 sm:space-x-6">
                <button class="text-slate-400 hover:text-slate-950 transition-colors flex items-center justify-center">
                    <Search :size="20" :stroke-width="2.5" />
                </button>
                <button
                    class="btn btn-ghost btn-sm text-slate-950 hover:bg-slate-50 border border-slate-200 rounded-none px-4 sm:px-6 font-bold uppercase italic tracking-widest text-[10px] flex items-center gap-2">
                    <User :size="14" :stroke-width="3" />
                    <span class="hidden xs:inline">Mi Cuenta</span>
                </button>
            </div>
        </nav>

        <!-- Sub-Navbar: Navigation links & Mobile Toggle -->
        <div class="bg-slate-950 w-full shadow-xl">
            <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center">

                <!-- Mobile Toggle (Only visible on mobile) -->
                <button @click="toggleMenu"
                    class="sm:hidden w-full py-2.5 px-6 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white/5 transition-all">
                    <div class="flex items-center gap-3">
                        <MenuIcon v-if="!isMenuOpen" :size="16" :stroke-width="2.5" />
                        <X v-else :size="16" :stroke-width="2.5" />
                        <span>{{ isMenuOpen ? 'Cerrar Menú' : 'Categorías' }}</span>
                    </div>
                    <ChevronDown :size="14" class="transition-transform duration-300"
                        :class="{ 'rotate-180': isMenuOpen }" />
                </button>

                <!-- Desktop Links & Mobile Dropdown Stack -->
                <div class="w-full sm:w-auto overflow-hidden transition-all duration-300 ease-in-out"
                    :class="[isMenuOpen ? 'max-h-[500px] opacity-100 border-t border-white/5' : 'max-h-0 sm:max-h-full opacity-0 sm:opacity-100 overflow-hidden sm:overflow-visible']">
                    <div
                        class="flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white py-4 sm:py-0 px-6 sm:px-0">
                        <router-link @click="isMenuOpen = false" to="/"
                            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">Inicio</router-link>
                        <a @click="isMenuOpen = false"
                            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">Guitarras</a>
                        <a @click="isMenuOpen = false"
                            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">Amplificadores</a>
                        <a @click="isMenuOpen = false"
                            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">Efectos</a>
                        <a @click="isMenuOpen = false"
                            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer">Accesorios</a>
                        <a @click="isMenuOpen = false"
                            class="w-full sm:w-auto text-center px-4 py-3 sm:py-2.5 hover:bg-white/10 transition-all cursor-pointer text-amber-500 font-black">Outlet</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
/* Transiciones para el menu movil si fuera necesario CSS extra */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
