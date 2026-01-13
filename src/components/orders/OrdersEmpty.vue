<script setup>
import { Package } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-slate-50 rounded-2xl p-12 border border-slate-100 border-dashed flex flex-col items-center text-center">
    <div class="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-6">
      <Package :size="32" class="text-slate-400" />
    </div>
    <h3 class="font-black text-slate-900 uppercase italic tracking-tighter text-xl mb-2">
      No tienes pedidos pendientes
    </h3>
    <p class="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-xs leading-relaxed">
      ¡Parece que tu carrito está vacío! Explora nuestra tienda para agregar productos.
    </p>
    <router-link to="/" class="mt-8 bg-slate-950 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-slate-950 transition-all">
      Ir a la Tienda
    </router-link>
  </div>
</template>
