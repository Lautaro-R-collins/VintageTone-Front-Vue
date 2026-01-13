<script setup>
import { Trash2 } from 'lucide-vue-next'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove'])

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(price)
}

const handleRemove = () => {
  emit('remove', props.item.id)
}
</script>

<template>
  <div class="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all group relative">
    <!-- Delete Action Top-Right -->
    <button 
      @click="handleRemove"
      class="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer z-20"
      title="Eliminar del carrito"
    >
      <Trash2 :size="16" />
    </button>

    <div class="w-20 h-20 rounded-xl bg-white overflow-hidden border border-slate-200 shrink-0">
      <img :src="item.image" :alt="item.name" class="w-full h-full object-contain p-2" />
    </div>
    
    <div class="flex-1 pr-10">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-lg leading-tight">
            {{ item.name }}
          </h3>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
            Cantidad: <span class="text-slate-950">{{ item.quantity }}</span> | Stock: {{ item.stock }}
          </p>
        </div>
        <div class="flex flex-col items-end">
          <p class="font-black text-slate-950 italic tracking-tighter text-xl">
            {{ formatPrice(parseFloat(item.price.replace(/,/g, '')) * item.quantity) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
