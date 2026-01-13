<script setup>
import { Package, Heart, History, LayoutDashboard } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <!-- Admin Panel (Conditional) -->
    <router-link v-if="authStore.user?.isAdmin" to="/admin" 
      class="bg-slate-950 p-6 rounded-3xl border border-slate-900 hover:border-amber-500 transition-all group lg:col-span-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform">
            <LayoutDashboard :size="24" />
          </div>
          <div>
            <h3 class="font-black text-white uppercase italic tracking-tighter text-xl">Panel de Administración</h3>
            <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Gestión global de la tienda</p>
          </div>
        </div>
        <div class="hidden md:flex items-center gap-2 text-amber-500 font-black uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
          Acceder ahora <LayoutDashboard :size="14" />
        </div>
      </div>
    </router-link>

    <router-link to="/Orders" class="bg-white p-6 rounded-3xl border border-slate-100 hover:border-amber-500 transition-all group">
      <div class="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-amber-950 transition-colors">
        <Package :size="24" />
      </div>
      <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-xl">Pedidos pendientes</h3>
      <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Gestiona tus compras</p>
    </router-link>

    <router-link to="/favorites" class="bg-white p-6 rounded-3xl border border-slate-100 hover:border-amber-500 transition-all group">
      <div class="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
        <Heart :size="24" />
      </div>
      <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-xl">Favoritos</h3>
      <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Tus tesoros guardados</p>
    </router-link>

    <div class="bg-white p-6 rounded-3xl border border-slate-100 hover:border-amber-500 transition-all group cursor-pointer">
      <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
        <History :size="24" />
      </div>
      <h3 class="font-black text-slate-950 uppercase italic tracking-tighter text-xl">Historial</h3>
      <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Vistos recientemente</p>
    </div>
  </div>
</template>
