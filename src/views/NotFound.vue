<script setup>
import { Home, AlertCircle } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span class="text-[30rem] font-black italic uppercase tracking-tighter">404</span>
    </div>

    <div class="space-y-8 max-w-lg">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-600 mb-4 animate-bounce">
        <AlertCircle :size="40" />
      </div>

      <div class="space-y-4">
        <h1 class="text-6xl md:text-8xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
          Oops! <span class="text-amber-500">404</span>
        </h1>
        <p class="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
          Parece que hemos perdido la sintonía. La página que buscas no existe o ha sido movida a otra frecuencia.
        </p>
      </div>

      <div class="pt-6">
        <router-link 
          to="/" 
          class="inline-flex items-center gap-3 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest text-sm transition-all shadow-xl active:scale-95 group"
        >
          <Home :size="18" class="group-hover:-translate-y-1 transition-transform" />
          Volver al Inicio
        </router-link>
      </div>
    </div>
  </div>
</template>
