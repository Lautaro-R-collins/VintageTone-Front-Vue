<script setup>
import headerImg from '../../assets/home/HeaderImg.webp'
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
    <header class="relative w-full h-[80vh] overflow-hidden">
        <!-- Background Image -->
        <img :src="headerImg" alt="VintageTone Hero" class="absolute inset-0 w-full h-full object-cover z-0" />

        <!-- Overlay Content -->
        <div class="absolute inset-0 z-10 flex items-center">
            <div class="max-w-7xl mx-auto px-6 w-full flex justify-start">
                <div class="max-w-md space-y-6">
                    <div class="space-y-2">
                        <span class="text-amber-500 font-black uppercase text-xs tracking-[0.3em] drop-shadow-lg">
                            Selección Premium
                        </span>
                        <h2
                            class="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                            Sonido con <br />
                            <span class="text-amber-500">Historia.</span>
                        </h2>
                    </div>

                    <p class="text-slate-100 font-medium text-lg leading-relaxed drop-shadow-md">
                        Descubre nuestra colección exclusiva de instrumentos vintage.
                    </p>

                    <button
                        class="group btn bg-white hover:bg-amber-500 border-none text-slate-900 rounded-full px-10 font-black uppercase italic tracking-widest text-xs flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-2xl">
                        Conoce más
                        <ArrowRight :size="16" class="transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>
