<script setup>
import { ShoppingCart } from 'lucide-vue-next'

const props = defineProps({
  totalPrice: {
    type: Number,
    required: true
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(price)
}
</script>

<template>
  <div class="mt-12 bg-slate-950 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
    <div class="absolute top-0 right-0 p-8 opacity-10 rotate-12">
      <ShoppingCart :size="120" />
    </div>
    
    <div class="relative z-10 text-center md:text-left">
      <p class="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-1">Total a Finalizar</p>
      <h2 class="text-4xl font-black italic tracking-tighter leading-none">
        {{ formatPrice(totalPrice) }}
      </h2>
    </div>

    <div class="relative z-10 flex gap-4 w-full md:w-auto">
      <router-link to="/checkout" class="flex-1 md:flex-none bg-amber-500 text-slate-950 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all text-center">
        Finalizar Compra
      </router-link>
    </div>
  </div>
</template>
