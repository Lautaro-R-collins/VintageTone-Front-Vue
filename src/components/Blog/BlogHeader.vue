<script setup>
</script>

<template>
    <section class="relative h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <!-- Background Image with Overlay -->
        <div class="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop" 
                alt="VintageTone Blog"
                class="w-full h-full object-cover opacity-40 scale-105"
            >
            <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 text-center px-6 max-w-4xl">
            <p class="text-amber-500 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 drop-shadow-lg">
                Magazine
            </p>
            <h1 class="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Nuestro <span class="text-amber-500">Blog</span>
            </h1>
        </div>
    </section>
</template>
