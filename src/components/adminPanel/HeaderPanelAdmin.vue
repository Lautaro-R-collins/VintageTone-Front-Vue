<script setup>
import { ArrowLeft, LayoutDashboard, Search, Plus } from 'lucide-vue-next'

defineProps({
  searchQuery: String
})

defineEmits(['go-back', 'open-modal', 'update:searchQuery'])
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
    <div class="space-y-2">
      <button 
        @click="$emit('go-back')"
        class="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-950 font-bold uppercase tracking-widest text-[10px] transition-colors group">
        <ArrowLeft :size="14" class="group-hover:-translate-x-1 transition-transform" /> Volver al Perfil
      </button>
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-slate-950 text-amber-500 flex items-center justify-center shadow-lg">
          <LayoutDashboard :size="24" />
        </div>
        <h1 class="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">
          Panel de Control
        </h1>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="relative hidden lg:block">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
        <input 
          type="text" 
          :value="searchQuery"
          @input="$emit('update:searchQuery', $event.target.value)"
          placeholder="Buscar productos..."
          class="bg-white border border-slate-100 pl-12 pr-6 py-3 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-500 shadow-sm w-64"
        />
      </div>
      <button 
        @click="$emit('open-modal')"
        class="bg-amber-500 text-slate-950 cursor-pointer px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-950 hover:text-white transition-all flex items-center gap-2 shadow-lg">
        <Plus :size="16" /> Nuevo Producto
      </button>
    </div>
  </div>
</template>
