<script setup>
import { ArrowLeft, Loader2, Info } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'

// Components
import OrdersHeader from '../components/orders/OrdersHeader.vue'
import OrderItem from '../components/orders/OrderItem.vue'
import OrdersSummary from '../components/orders/OrdersSummary.vue'
import OrdersEmpty from '../components/orders/OrdersEmpty.vue'

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

const handleRemove = (productId) => {
  cartStore.removeItem(productId)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header Navigation -->
      <div class="flex items-center justify-between mb-8">
        <button 
          @click="goBack"
          class="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-950 font-bold uppercase tracking-widest text-xs transition-colors group">
          <ArrowLeft :size="16" class="group-hover:-translate-x-1 transition-transform" /> Volver al Perfil
        </button>
      </div>

      <div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 overflow-hidden relative">
        <OrdersHeader />

        <!-- Content -->
        <div v-if="isLoading" class="py-20 flex flex-col items-center justify-center gap-4 relative z-10">
          <Loader2 :size="40" class="text-amber-500 animate-spin" />
          <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando tus pedidos...</p>
        </div>

        <div v-else class="space-y-6 relative z-10">
          <template v-if="cartStore.items.length > 0">
            <!-- Cart Items List -->
            <div class="space-y-4">
              <OrderItem 
                v-for="item in cartStore.items" 
                :key="item._id || item.id" 
                :item="item"
                @remove="handleRemove"
              />
            </div>

            <OrdersSummary :total-price="cartStore.totalPrice" />
          </template>

          <!-- Empty State -->
          <OrdersEmpty v-else />

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
</template>
