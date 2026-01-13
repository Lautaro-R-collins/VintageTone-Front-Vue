<script setup>
import { Package, ArrowLeft, Loader2, Info, ShoppingCart, Trash2 } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const isLoading = ref(true)

// Simulate loading orders
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})

const goBack = () => {
  router.push('/profile')
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(price)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <button 
          @click="goBack"
          class="flex items-center gap-2 text-slate-500 hover:text-slate-950 font-bold uppercase tracking-widest text-xs transition-colors group">
          <ArrowLeft :size="16" class="group-hover:-translate-x-1 transition-transform" /> Volver al Perfil
        </button>
      </div>

      <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 overflow-hidden relative">
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

          <!-- Content -->
          <div v-if="isLoading" class="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 :size="40" class="text-amber-500 animate-spin" />
            <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando tus pedidos...</p>
          </div>

          <div v-else class="space-y-6">
            <template v-if="cartStore.items.length > 0">
              <!-- Cart Items List -->
              <div class="space-y-4">
                <div v-for="item in cartStore.items" :key="item.id" 
                  class="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all group relative">
                  <!-- Delete Action Top-Right -->
                  <button 
                    @click="cartStore.removeItem(item.id)"
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
              </div>

              <!-- Summary Card -->
              <div class="mt-12 bg-slate-950 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div class="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                  <ShoppingCart :size="120" />
                </div>
                
                <div class="relative z-10 text-center md:text-left">
                  <p class="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-1">Total a Finalizar</p>
                  <h2 class="text-4xl font-black italic tracking-tighter leading-none">
                    {{ formatPrice(cartStore.totalPrice) }}
                  </h2>
                </div>

                <div class="relative z-10 flex gap-4 w-full md:w-auto">
                  <router-link to="/checkout" class="flex-1 md:flex-none bg-amber-500 text-slate-950 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all text-center">
                    Finalizar Compra
                  </router-link>
                </div>
              </div>
            </template>

            <!-- Empty State -->
            <div v-else class="bg-slate-50 rounded-2xl p-12 border border-slate-100 border-dashed flex flex-col items-center text-center">
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

            <!-- Help Info -->
            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-start text-blue-900">
              <Info :size="20" class="shrink-0 mt-1" />
              <div class="space-y-1">
                <p class="text-xs font-black uppercase tracking-widest">Nota Recordatoria</p>
                <p class="text-sm leading-relaxed opacity-80">
                  Estos son los productos que has seleccionado para tu compra. Para modificar cantidades o eliminar items, dirígete al carrito de compras principal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
