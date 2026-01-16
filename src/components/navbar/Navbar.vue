```vue
<script setup>
import { ref } from 'vue'
import { Menu as MenuIcon, X, ChevronDown, ShoppingBag } from 'lucide-vue-next'
import NavbarBrand from './NavbarBrand.vue'
import NavbarActions from './NavbarActions.vue'
import NavbarLinks from './NavbarLinks.vue'
import SearchBar from './SearchBar.vue'


const isMenuOpen = ref(false)
const isMobileSearchOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
    isMenuOpen.value = false
}
</script>

<template>
    <header class="sticky top-0 z-50">
        <!-- Mobile Search Overlay -->
        <div v-if="isMobileSearchOpen" 
             class="absolute inset-x-0 top-0 bg-white z-60 p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top duration-300 border-b border-slate-100">
            <SearchBar class="grow" :is-mobile="true" @close="isMobileSearchOpen = false" />
            <button @click="isMobileSearchOpen = false" class="btn btn-ghost btn-circle btn-sm">
                <X :size="20" />
            </button>
        </div>

        <!-- Main Navbar actions -->
        <nav class="bg-white border-b border-slate-100 backdrop-blur-md bg-opacity-95 text-slate-950">
            <div class="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
                <NavbarBrand />
                <SearchBar class="hidden md:block" />
                <NavbarActions @toggle-search="isMobileSearchOpen = true" />
            </div>
        </nav>

        <!-- Sub-Navbar mobile -->
        <div class="bg-slate-950 w-full shadow-xl">
            <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center">

                <!-- Mobile Toggle -->
                <button @click="toggleMenu"
                    class="lg:hidden w-full py-2.5 px-6 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-white hover:bg-white/5 transition-all">
                    <div class="flex items-center gap-3">
                        <MenuIcon v-if="!isMenuOpen" :size="16" :stroke-width="2.5" />
                        <X v-else :size="16" :stroke-width="2.5" />
                        <span>{{ isMenuOpen ? 'Cerrar Menú' : 'Categorías' }}</span>
                    </div>
                    <ChevronDown :size="14" class="transition-transform duration-300"
                        :class="{ 'rotate-180': isMenuOpen }" />
                </button>

                <!-- Links & Dropdown Stack -->
                <div class="w-full overflow-hidden transition-all duration-300 ease-in-out"
                    :class="[isMenuOpen ? 'max-h-[500px] opacity-100 border-t border-white/5' : 'max-h-0 lg:max-h-full opacity-0 lg:opacity-100 overflow-hidden lg:overflow-visible']">
                    <NavbarLinks @link-clicked="closeMenu" />
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
