<script setup>
import { Package, ArrowLeft, Loader2, Info } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
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
                Estado de tus compras actuales
              </p>
            </div>
          </div>

          <!-- Content -->
          <div v-if="isLoading" class="py-20 flex flex-col items-center justify-center gap-4">
            <Loader2 :size="40" class="text-amber-500 animate-spin" />
            <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando tus pedidos...</p>
          </div>

          <div v-else class="space-y-6">
            <!-- Empty State (Placeholder) -->
            <div class="bg-slate-50 rounded-2xl p-12 border border-slate-100 border-dashed flex flex-col items-center text-center">
              <div class="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-6">
                <Package :size="32" class="text-slate-400" />
              </div>
              <h3 class="font-black text-slate-900 uppercase italic tracking-tighter text-xl mb-2">
                No tienes pedidos pendientes
              </h3>
              <p class="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-xs leading-relaxed">
                ¡Parece que todo está al día! Puedes seguir explorando nuestros productos en la tienda.
              </p>
              <router-link to="/" class="mt-8 bg-slate-950 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-slate-950 transition-all">
                Ir a la Tienda
              </router-link>
            </div>

            <!-- Help Info -->
            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4 items-start text-blue-900">
              <Info :size="20" class="shrink-0 mt-1" />
              <div class="space-y-1">
                <p class="text-xs font-black uppercase tracking-widest">Información de Envío</p>
                <p class="text-sm leading-relaxed opacity-80">
                  Recuerda que los tiempos de entrega pueden variar según tu ubicación y el método de envío seleccionado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
