<script setup>
defineProps({
  stats: Array
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <div v-for="stat in stats" :key="stat.label" 
      class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-amber-500 transition-all group overflow-hidden relative">
      <div class="flex items-center justify-between relative z-10">
        <div>
          <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{{ stat.label }}</p>
          <h3 class="text-3xl font-black text-slate-950 italic tracking-tighter">{{ stat.value }}</h3>
        </div>
        <div :class="[stat.color, 'w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform']">
          <component :is="stat.icon" :size="24" />
        </div>
      </div>
      <div class="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <component :is="stat.icon" :size="80" />
      </div>
    </div>
  </div>
</template>
