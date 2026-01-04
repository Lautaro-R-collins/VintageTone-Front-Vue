<script setup>
import { ShoppingBag } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart'
import AuthButton from './AuthButton.vue'

const cartStore = useCartStore()
</script>

<template>
    <div class="flex items-center space-x-4 sm:space-x-6">
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
