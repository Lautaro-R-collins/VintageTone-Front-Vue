<script setup>
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
    <section class="pb-15 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <router-link to="/category/outlet"
                class="group relative overflow-hidden bg-slate-900 aspect-21/9 md:aspect-3/1 flex items-end">
                
                <!-- Background Image -->
                <img src="https://www.gibson.com/cdn/shop/files/HERO_desktop__Gibson-DTCJB20BB-1800x1200.jpg?v=1766508063" 
                    alt="Outlet VintageTone"
                    class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 ease-in-out" />
                
                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent"></div>

                <!-- Content -->
                <div class="relative w-full p-8 md:p-12 flex items-center justify-between border-b-2 border-transparent group-hover:border-amber-500 transition-all duration-300">
                    <div class="space-y-1">
                        <p class="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-amber-500 italic">
                            Outlet & Ex-Demo
                        </p>
                        <span class="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white italic">
                            Ofertas Imperdibles
                        </span>
                    </div>

                    <ArrowRight :size="35" class="transition-transform group-hover:translate-x-2 text-amber-500" />
                </div>
            </router-link>
        </div>
    </section>
</template>
