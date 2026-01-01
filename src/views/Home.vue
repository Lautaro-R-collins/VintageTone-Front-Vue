<script setup>
import { ShoppingBag, ArrowRight, Star, Heart } from 'lucide-vue-next'
</script>

<template>
  <div class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <header class="text-center space-y-8">
        <h2 class="text-sm font-black tracking-[0.4em] text-amber-600 uppercase">Bienvenido a la Era Dorada</h2>
        <h1 class="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">
          SONIDO <br/>
          <span class="text-white [text-shadow:-1px_-1px_0_#0f172a,1px_-1px_0_#0f172a,-1px_1px_0_#0f172a,1px_1px_0_#0f172a]">VINTAGE</span>
        </h1>
        <p class="text-slate-500 max-w-xl mx-auto text-xl leading-relaxed font-medium">
          Instrumentos legendarios y equipamiento clásico para músicos que buscan lo auténtico.
        </p>
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 pt-8">
          <button class="btn btn-primary btn-lg rounded-full px-12 font-black uppercase italic shadow-xl shadow-amber-500/20 flex items-center gap-3">
            Explorar Catálogo
            <ShoppingBag :size="20" />
          </button>
          <button class="btn btn-outline border-slate-200 text-slate-900 btn-lg rounded-full px-12 font-black uppercase italic hover:bg-slate-900 hover:text-white flex items-center gap-3">
            Nuestra Historia
            <ArrowRight :size="20" />
          </button>
        </div>
      </header>

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
