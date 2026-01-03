<script setup>
import catGuitars from '../../assets/home/cat_guitars.png'
import catAmps from '../../assets/home/cat_amps.png'
import catPedals from '../../assets/home/cat_pedals.png'
import catAccessories from '../../assets/home/cat_accessories.png'
import { ArrowRight } from 'lucide-vue-next'

const categories = [
    { name: 'Instrumentos', image: catGuitars, path: '/category/instrumentos' },
    { name: 'Amplificadores', image: catAmps, path: '/category/amplificadores' },
    { name: 'Efectos', image: catPedals, path: '/category/efectos' },
    { name: 'Accesorios', image: catAccessories, path: '/category/accesorios' }
]
</script>

<template>
    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <h2 class="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-12">
                Categorías
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <router-link v-for="category in categories" :key="category.name" :to="category.path"
                    class="group cursor-pointer">
                    <!-- Square Card -->
                    <div class="aspect-square overflow-hidden bg-slate-100 flex items-center justify-center">
                        <img :src="category.image" :alt="category.name"
                            class="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out" />
                    </div>
                    <!-- Category Name -->
                    <div
                        class="mt-4 flex items-center justify-between border-b-2 border-transparent group-hover:border-amber-500 transition-all duration-300 pb-2">
                        <span class="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                            {{ category.name }}
                        </span>
                        <ArrowRight :size="16" class="transition-transform group-hover:translate-x-1" />
                    </div>
                </router-link>
            </div>
        </div>
    </section>
</template>
