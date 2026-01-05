<script setup>
import { ShoppingBag, Heart } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart'
import { useFavoritesStore } from '../../stores/favorites'
import AuthButton from './AuthButton.vue'

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
</script>

<template>
    <div class="flex items-center space-x-4 sm:space-x-6">
        <router-link to="/favorites" class="cursor-pointer relative group">
            <Heart :size="25" class="group-hover:scale-110 group-hover:text-red-500 transition-all duration-300" />
            <!-- Badge -->
            <span v-if="favoritesStore.count > 0"
                class="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-black text-[9px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {{ favoritesStore.count }}
            </span>
        </router-link>

        <!-- Cart Icon -->
        <button
            @click="cartStore.toggleDrawer()"
            class="cursor-pointer relative group"
        >
            <ShoppingBag :size="25" class="group-hover:scale-110 transition-transform" />
            <!-- Badge -->
            <span v-if="cartStore.totalItems > 0"
                class="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[9px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {{ cartStore.totalItems }}
            </span>
        </button>

        <AuthButton />
    </div>
</template>
