<script setup>
import { Edit, Trash2 } from 'lucide-vue-next'

defineProps({
  products: Array
})

defineEmits(['edit-product', 'delete-product'])
</script>

<template>
  <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
    <div class="p-8 border-b border-slate-50 flex items-center justify-between">
      <h2 class="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Productos Recientes</h2>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-slate-50/50">
            <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Producto</th>
            <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Categoría</th>
            <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="product in products" :key="product._id || product.id" class="hover:bg-slate-50/30 transition-colors group">
            <td class="px-8 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img v-if="product.images?.length > 0" :src="product.images[0]" class="w-full h-full object-cover" />
                </div>
                <span class="font-bold text-slate-900 text-sm">{{ product.name }}</span>
              </div>
            </td>
            <td class="px-8 py-4">
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full w-fit">
                  {{ product.category }}
                </span>
                <span v-if="product.subcategory" class="text-[9px] font-bold text-amber-600 uppercase tracking-widest px-3">
                  {{ product.subcategory }} 
                </span>
              </div>
            </td>
            <td class="px-8 py-4 text-right">
              <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="$emit('edit-product', product)" class="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-amber-500 border border-transparent hover:border-slate-100 cursor-pointer">
                  <Edit :size="16" />
                </button>
                <button @click="$emit('delete-product', product._id || product.id)" class="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-red-500 border border-transparent hover:border-slate-100 cursor-pointer">
                  <Trash2 :size="16" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
