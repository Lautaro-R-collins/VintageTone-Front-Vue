<script setup>
import { ArrowRight } from 'lucide-vue-next'

const infoCards = [
    {
        name: 'Visita nuestro blog',
        image: 'https://iotvnaw69daj.i.optimole.com/cb:Amyz.6583c/w:auto/h:auto/q:75/f:best/https://www.bloggingpro.com/wp-content/uploads/2023/04/How-to-Start-a-Music-Blog-in-Five-Easy-Steps.jpg',
        path: '/blog',
        subtitle: 'Magazine & Noticias'
    },
    {
        name: 'Conoce sobre nosotros',
        image: 'https://cdn.mos.cms.futurecdn.net/v2/t:0,l:150,cw:900,ch:675,q:80,w:900/e7wGrNp45WszHy549XVP5Z.jpg',
        path: '/about',
        subtitle: 'Historia & Pasión'
    }
]
</script>

<template>
    <section class="pb-10 bg-white ">
        <div class="max-w-7xl mx-auto px-6 ">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <router-link v-for="card in infoCards" :key="card.name" :to="card.path"
                    class="group relative overflow-hidden bg-slate-900 aspect-21/9 flex items-end">

                    <!-- Background Image -->
                    <img :src="card.image" :alt="card.name"
                        class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700 ease-in-out" />

                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent"></div>

                    <!-- Content -->
                    <div
                        class="relative w-full p-8 flex items-center justify-between border-b-2 border-transparent group-hover:border-amber-500 transition-all duration-300">
                        <div class="space-y-1">
                            <p class="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 italic">
                                {{ card.subtitle }}
                            </p>
                            <span class="text-xl md:text-2xl font-black uppercase tracking-tighter text-white italic">
                                {{ card.name }}
                            </span>
                        </div>

                        <ArrowRight :size="25" class="transition-transform group-hover:translate-x-1 text-amber-500" />

                    </div>
                </router-link>
            </div>
        </div>
    </section>
</template>
