<script setup>
import { Package } from 'lucide-vue-next'
</script>

<template>
  <div class="relative">
    <!-- Decoration Icon -->
    <div class="absolute top-0 right-0 p-8 opacity-5">
      <Package :size="200" />
    </div>

    <div class="relative z-10">
      <div class="flex items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg">
          <Package :size="24" />
        </div>
        <div>
          <h1 class="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">
            Pedidos Pendientes
          </h1>
          <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            Items en tu carrito como recordatorio
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
