<script setup>
import { useFavoritesStore } from '../stores/favorites'
import CardProduct from '../components/product/CardProduct.vue'
import { Heart } from 'lucide-vue-next'

const favoritesStore = useFavoritesStore()
</script>

<template>
    <div class="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
        <div class="max-w-7xl mx-auto space-y-12">
            <!-- Header -->
            <div class="space-y-4 text-center">
                <span class="text-amber-500 font-black uppercase text-xs tracking-[0.4em]">Tu Colección Personal</span>
                <h1 class="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tighter">
                    Tus <span class="text-amber-500">Favoritos</span>
                </h1>
            </div>

            <!-- Empty State -->
            <div v-if="favoritesStore.count === 0" class="flex flex-col items-center justify-center space-y-6">
                <div class="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                    <Heart :size="48" />
                </div>
                <div class="text-center space-y-2">
                    <h3 class="text-xl font-black text-slate-900 uppercase italic">Aún no tienes favoritos</h3>
                    <p class="text-slate-500 text-sm">Explora nuestro catálogo y guarda lo que te inspire.</p>
                </div>
                <router-link to="/category/instrumentos"
                    class="bg-slate-950 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-slate-950 transition-all">
                    Explorar Catálogo
                </router-link>
            </div>

            <!-- Grid -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <CardProduct v-for="product in favoritesStore.favorites" :key="product.id" :product="product" />
            </div>

            <!-- Clear Action -->
            <div v-if="favoritesStore.count > 0" class="flex justify-center pt-8">
                <button @click="favoritesStore.clearFavorites()"
                    class="bg-slate-950 cursor-pointer text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-slate-950 transition-all">
                    Vaciar Favoritos
                </button>
            </div>
        </div>
    </div>
</template>
