<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { X, Sparkles, Truck, CirclePercent } from 'lucide-vue-next'

const isVisible = ref(true)
const currentMessageIndex = ref(0)
const messages = [
    { text: 'DESCUENTOS DE FIN DE AÑO: HASTA 30% EN SELECCIONADOS', icon: Sparkles },
    { text: 'ENVÍOS GRATIS EN COMPRAS SUPERIORES A $150.000', icon: Truck },
    { text: '50% OFF EN LA SEGUNDA UNIDAD DE ACCESORIOS', icon: CirclePercent }
]

let intervalId = null

const nextMessage = () => {
    currentMessageIndex.value = (currentMessageIndex.value + 1) % messages.length
}

onMounted(() => {
    intervalId = setInterval(nextMessage, 4000)
})

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})

const closeBar = () => {
    isVisible.value = false
}
</script>

<template>
    <transition name="bar">
        <div v-if="isVisible"
            class="bg-emerald-50 text-emerald-900 overflow-hidden relative border-b border-emerald-100">
            <div class="max-w-7xl mx-auto h-10 flex items-center justify-center px-12 overflow-hidden">

                <transition-group name="slide-up">
                    <div v-for="(msg, index) in messages" :key="index" v-show="currentMessageIndex === index"
                        class="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] absolute">
                        <component :is="msg.icon" :size="14" class="text-emerald-500" />
                        <span>{{ msg.text }}</span>
                    </div>
                </transition-group>

            </div>

            <!-- Close Button -->
            <button @click="closeBar"
                class="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-emerald-900 hover:text-emerald-950 transition-colors p-1">
                <X :size="14" :stroke-width="3" />
            </button>
        </div>
    </transition>
</template>

<style scoped>
/* bar transition */
.bar-leave-active {
    transition: all 0.3s ease-in;
}

.bar-leave-to {
    height: 0;
    opacity: 0;
    border-bottom-width: 0;
}

/* slider animation */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from {
    transform: translateY(20px);
    opacity: 0;
}

.slide-up-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
