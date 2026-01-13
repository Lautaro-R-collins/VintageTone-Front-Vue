<script setup>
import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  Search, 
  Settings, 
  Users, 
  TrendingUp, 
  ArrowLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  PackageCheck
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const stats = [
  { label: 'Productos Totales', value: '124', icon: Package, color: 'bg-blue-500' },
  { label: 'Ventas del Mes', value: '$45.2k', icon: TrendingUp, color: 'bg-green-500' },
  { label: 'Usuarios Activos', value: '1,205', icon: Users, color: 'bg-purple-500' },
  { label: 'Stock Bajo', value: '8', icon: PackageCheck, color: 'bg-amber-500' },
]

const recentProducts = ref([
  { id: 1, name: 'Gibson Les Paul Standard', category: 'Guitarras', status: 'In Stock', price: '$2,500' },
  { id: 2, name: 'Fender Stratocaster 60s', category: 'Guitarras', status: 'Out of Stock', price: '$1,800' },
  { id: 3, name: 'Marshall JCM800', category: 'Amplificadores', status: 'In Stock', price: '$1,200' },
  { id: 4, name: 'Vox AC30 Vintage', category: 'Amplificadores', status: 'Low Stock', price: '$2,100' },
])

const goBack = () => {
  router.push('/profile')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div class="space-y-2">
          <button 
            @click="goBack"
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
              placeholder="Buscar productos..."
              class="bg-white border border-slate-100 pl-12 pr-6 py-3 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-500 shadow-sm w-64"
            />
          </div>
          <button class="bg-amber-500 text-slate-950 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-950 hover:text-white transition-all flex items-center gap-2 shadow-lg">
            <Plus :size="16" /> Nuevo Producto
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
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
          <!-- Background Decoration -->
          <div class="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <component :is="stat.icon" :size="80" />
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Products Table Column -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div class="p-8 border-b border-slate-50 flex items-center justify-between">
              <h2 class="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Productos Recientes</h2>
              <button class="text-[10px] font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700">Ver todo</button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-slate-50/50">
                    <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Producto</th>
                    <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Categoría</th>
                    <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Estado</th>
                    <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr v-for="product in recentProducts" :key="product.id" class="hover:bg-slate-50/30 transition-colors group">
                    <td class="px-8 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                          <Package :size="20" class="text-slate-400" />
                        </div>
                        <span class="font-bold text-slate-900 text-sm">{{ product.name }}</span>
                      </div>
                    </td>
                    <td class="px-8 py-4">
                      <span class="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">{{ product.category }}</span>
                    </td>
                    <td class="px-8 py-4">
                      <div class="flex items-center gap-2">
                        <div :class="[
                          'w-2 h-2 rounded-full',
                          product.status === 'In Stock' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                          product.status === 'Low Stock' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,44,44,0.5)]'
                        ]"></div>
                        <span class="text-[10px] font-black uppercase tracking-widest text-slate-700">{{ product.status }}</span>
                      </div>
                    </td>
                    <td class="px-8 py-4 text-right">
                      <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-amber-500 shadow-sm border border-transparent hover:border-slate-100">
                          <Edit :size="16" />
                        </button>
                        <button class="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-red-500 shadow-sm border border-transparent hover:border-slate-100">
                          <Trash2 :size="16" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Sidebar / Recent Activities -->
        <div class="space-y-6">
          <!-- Quick Config -->
          <div class="bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Settings :size="120" />
            </div>
            <div class="relative z-10 space-y-4">
              <h3 class="text-2xl font-black italic tracking-tighter uppercase leading-none">Configuración Rápida</h3>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Ajusta los parámetros globales de la tienda.</p>
              <div class="space-y-3">
                <button class="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between transition-colors text-left group/btn">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                      <Settings :size="16" />
                    </div>
                    <span class="text-xs font-bold uppercase tracking-widest">Tienda</span>
                  </div>
                  <ChevronRight :size="14" class="text-slate-500 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button class="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between transition-colors text-left group/btn">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                      <Users :size="16" />
                    </div>
                    <span class="text-xs font-bold uppercase tracking-widest">Usuarios</span>
                  </div>
                  <ChevronRight :size="14" class="text-slate-500 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <!-- Documentation / Support Help -->
          <div class="bg-amber-50 border border-amber-100 rounded-3xl p-8 relative overflow-hidden">
            <h3 class="text-amber-900 font-black uppercase italic tracking-tighter text-lg mb-2">Ayuda Técnica</h3>
            <p class="text-amber-800/70 text-xs font-bold uppercase tracking-widest leading-relaxed mb-4">
              Si necesitas ayuda con la API o la gestión de datos, consulta la documentación interna.
            </p>
            <button class="text-amber-950 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 group">
              Explorar Guía <ChevronRight :size="14" class="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
