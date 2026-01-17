<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import CardProduct from '../components/product/CardProduct.vue'
import ProductSkeleton from '../components/product/ProductSkeleton.vue'
import Breadcrumbs from '../components/common/Breadcrumbs.vue'
import { Search, SlidersHorizontal, PackageX, Sparkles } from 'lucide-vue-next'

const route = useRoute()
const productStore = useProductStore()

const searchQuery = computed(() => route.query.q || '')

const loadResults = async () => {
    if (searchQuery.value) {
        await productStore.searchProductsAction(searchQuery.value)
    }
}

onMounted(loadResults)

watch(() => route.query.q, loadResults)

const results = computed(() => productStore.searchResults)
const isLoading = computed(() => productStore.isLoading)
</script>

<template>
    <div class="bg-white min-h-screen pb-24">
        <Breadcrumbs />

        <main class="max-w-7xl mx-auto px-6 py-12">
            <!-- Header Section -->
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-10 border-b border-slate-100">
                <div class="space-y-4">
                    <div class="flex items-center gap-4 text-amber-500">
                        <Search :size="24" stroke-width="3" />
                        <span class="text-[10px] font-black uppercase tracking-[0.4em] italic">Explorador de Equipamiento</span>
                    </div>
                    <h1 class="text-4xl md:text-6xl font-black text-slate-950 uppercase italic tracking-tighter leading-none">
                        Resultados para: <span class="text-amber-500">"{{ searchQuery }}"</span>
                    </h1>
                    <p class="text-slate-400 font-bold uppercase italic tracking-widest text-xs">
                        {{ results.length }} productos encontrados en nuestra colección vintage
                    </p>
                </div>
            </div>

            <!-- Content Area -->
            <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                <ProductSkeleton v-for="i in 8" :key="i" />
            </div>

            <div v-else-if="results.length > 0">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <CardProduct v-for="product in results" :key="product._id" :product="product" />
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="py-32 text-center">
                <div class="max-w-md mx-auto space-y-8">
                    <div class="relative inline-block">
                        <div class="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center mx-auto mb-6 transform -rotate-6 group hover:rotate-0 transition-transform duration-500 shadow-sm border border-slate-100">
                            <PackageX :size="48" class="text-slate-200 group-hover:text-amber-400 transition-colors" />
                        </div>
                        <Sparkles class="absolute -top-2 -right-2 text-amber-500 animate-pulse" :size="20" />
                    </div>
                    
                    <div class="space-y-3">
                        <h2 class="text-3xl font-black text-slate-950 uppercase italic tracking-tight">No hay coincidencias exactas</h2>
                        <p class="text-slate-500 font-medium px-4">
                            No encontramos ningun producto que coincida con "<span class="text-slate-900 font-bold">{{ searchQuery }}</span>". 
                            Prueba con otros términos o explora nuestras categorías principales.
                        </p>
                    </div>

                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <router-link to="/" class="btn bg-slate-950 text-white rounded-2xl px-8 border-none hover:bg-amber-500 hover:text-slate-950 transition-all font-black uppercase italic tracking-widest text-xs w-full sm:w-auto">
                            Volver al Inicio
                        </router-link>
                        <router-link to="/category/Guitarras" class="btn bg-slate-50 text-slate-900 rounded-2xl px-8 border-none hover:bg-slate-100 transition-all font-black uppercase italic tracking-widest text-xs w-full sm:w-auto">
                            Ver Guitarras
                        </router-link>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
