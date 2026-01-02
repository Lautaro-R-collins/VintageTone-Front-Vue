<script setup>
const bannerImg = 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=2070&auto=format&fit=crop'
</script>

<template>
    <section class="relative w-full h-[60vh] overflow-hidden flex items-center mb-0 bg-slate-950">
        <!-- Background Image -->
        <img 
            :src="bannerImg" 
            alt="VintageTone Bass" 
            class="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]"
        />
        
        <!-- Deep Dark Overlay -->
        <div class="absolute inset-0 bg-linear-to-r from-black via-black/40 to-transparent"></div>

        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto px-6 w-full text-left">
            <div class="max-w-xl space-y-6">
                <div class="space-y-2">
                    <span class="text-amber-500 font-black uppercase text-[10px] tracking-[0.4em] drop-shadow-md">
                        Sonido Legendario
                    </span>
                    <h2 class="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-none drop-shadow-2xl">
                        Encuentra <br/>
                        tu propio sonido.
                    </h2>
                </div>
                
                <p class="text-slate-400 text-sm md:text-base font-medium max-w-sm drop-shadow-md leading-relaxed">
                    Nuestra selección de instrumentos vintage está pensada para músicos que buscan una identidad sonora única y un alma que trascienda el tiempo.
                </p>

                <div class="">
                    <button class="bg-white pt-4 cursor-pointer hover:bg-amber-500 rounded-full text-slate-950 font-black uppercase italic tracking-widest text-[10px] px-10 py-4 transition-all hover:scale-105 active:scale-95 shadow-2xl">
                        Explorar catálogo
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
img {
    filter: brightness(0.8);
}
</style>
