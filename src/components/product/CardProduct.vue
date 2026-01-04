<script setup>
import { useRouter } from 'vue-router'
import { ArrowRight, Heart, ShoppingBag } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const router = useRouter()
const cartStore = useCartStore()

const goToProduct = () => {
    // Navigate to product detail (route to be defined later)
    router.push(`/product/${props.product.id}`)
}

const toggleFavorite = (e) => {
    e.stopPropagation() // Prevent triggering the card click
    // logic here
}

const addToCart = (e) => {
    e.stopPropagation()
    cartStore.addItem(props.product)
}
</script>

<template>
    <div @click="goToProduct"
        class="group aspect-4/5 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-100/10 hover:border-amber-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl cursor-pointer">
        <!-- Product Image -->
        <img :src="product.image" :alt="product.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

        <!-- Dark Overlay for better contrast -->
        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500"></div>

        <!-- Card Actions -->
        <div
            class="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
            <button @click="toggleFavorite"
                class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
                <Heart :size="18" />
            </button>
            <button @click="addToCart"
                class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-amber-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="(product.stock || 0) <= 0">
                <ShoppingBag :size="18" />
            </button>
        </div>

        <!-- Product Info -->
        <div class="absolute bottom-0 left-0 p-8 space-y-3 w-full z-10">
            <span class="text-amber-500 font-black uppercase text-[10px] tracking-widest drop-shadow-md">
                {{ product.badge || 'Colección 2026' }}
            </span>
            <h3 class="text-2xl font-black text-white uppercase leading-tight drop-shadow-lg">
                {{ product.name }}
            </h3>
            <p class="text-white font-bold text-lg drop-shadow-md">
                ${{ product.price }}
            </p>
            <button
                class="text-xs font-bold text-slate-300 group-hover:text-amber-500 transition-colors uppercase tracking-widest flex items-center gap-2">
                Ver detalles
                <ArrowRight :size="14" :stroke-width="3" />
            </button>
        </div>
    </div>
</template>
