<script setup>
import { Package, Heart, History } from 'lucide-vue-next'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <router-link to="/Orders" class="bg-white p-6 rounded-3xl border border-slate-100 hover:border-amber-500 transition-all group">
      <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-amber-950 transition-colors">
        <Package :size="24" />
      </div>
      <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-xl">Pedidos pendientes</h3>
      <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Gestiona tus compras</p>
    </router-link>

    <router-link to="/favorites" class="bg-white p-6 rounded-3xl border border-slate-100 hover:border-amber-500 transition-all group">
      <div class="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
        <Heart :size="24" />
      </div>
      <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-xl">Favoritos</h3>
      <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Tus tesoros guardados</p>
    </router-link>

    <div class="bg-white p-6 rounded-3xl border border-slate-100 hover:border-amber-500 transition-all group cursor-pointer">
      <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
        <History :size="24" />
      </div>
      <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-xl">Historial</h3>
      <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Vistos recientemente</p>
    </div>
  </div>
</template>
