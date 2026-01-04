<script setup>
import { ShieldCheck, Truck, CreditCard, Star } from 'lucide-vue-next'

const items = [
    { text: 'Envíos asegurados a todo el país', icon: Truck },
    { text: 'Financiación hasta 12 cuotas sin interés', icon: CreditCard },
    { text: 'Equipamiento seleccionado por expertos', icon: Star },
    { text: 'Garantía de originalidad VintageTone', icon: ShieldCheck },
    { text: 'Lo mejor del sonido clásico en un solo lugar', icon: Star }
]
</script>

<template>
    <div class="bg-slate-950 overflow-hidden py-3 border-y border-white/5 relative">
        <div class="marquee-container flex items-center whitespace-nowrap">
            <!-- First set -->
            <div class="marquee-content flex items-center shrink-0">
                <div v-for="(item, index) in items" :key="'a-' + index" class="flex items-center gap-4 px-12">
                    <component :is="item.icon" :size="14" class="text-amber-500" />
                    <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 italic">
                        {{ item.text }}
                    </span>
                </div>
            </div>
            <!-- Second set -->
            <div class="marquee-content flex items-center shrink-0">
                <div v-for="(item, index) in items" :key="'b-' + index" class="flex items-center gap-4 px-12">
                    <component :is="item.icon" :size="14" class="text-amber-500" />
                    <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 italic">
                        {{ item.text }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.marquee-container {
    animation: marquee 15s linear infinite;
}

@keyframes marquee {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

/* pause on hover */
.bg-slate-950:hover .marquee-container {
    animation-play-state: paused;
}
</style>
