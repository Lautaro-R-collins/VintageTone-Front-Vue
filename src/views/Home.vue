<script setup>
import HeaderHome from '../components/home/HeaderHome.vue'
import SliderBanner from '../components/home/SliderBanner.vue'
import CategoryHome from '../components/home/CategoryHome.vue'
import { ArrowRight, Star, Heart } from 'lucide-vue-next'
</script>

<template>
  <div>
    <HeaderHome />
    <SliderBanner />
    <CategoryHome />

    <div class="max-w-7xl mx-auto px-6">

      <section class="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div v-for="i in 3" :key="i" class="group aspect-4/5 bg-white rounded-4xl overflow-hidden relative border border-slate-100 hover:border-amber-500/30 transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2">
           <div class="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent opacity-80"></div>
           
           <!-- Card Actions -->
           <div class="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
             <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-red-500 transition-colors">
               <Heart :size="18" />
             </button>
             <button class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-amber-500 transition-colors">
               <Star :size="18" />
             </button>
           </div>

           <div class="absolute bottom-0 left-0 p-10 space-y-3 w-full">
             <span class="text-amber-600 font-black uppercase text-[10px] tracking-widest">Colección 2026</span>
             <h3 class="text-2xl font-black text-slate-900 uppercase italic">Instrumento {{ i }}</h3>
             <button class="text-xs font-bold text-slate-400 group-hover:text-amber-600 transition-colors uppercase tracking-widest flex items-center gap-2">
               Ver detalles
               <ArrowRight :size="14" :stroke-width="3" />
             </button>
           </div>
        </div>
      </section>
    </div>
  </div>
</template>
