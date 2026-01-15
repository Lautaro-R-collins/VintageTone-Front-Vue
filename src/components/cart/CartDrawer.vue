<script setup>
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()
const { items, isDrawerOpen, totalPrice, totalSavings, totalItems } = storeToRefs(cartStore)

const goToCheckout = () => {
    cartStore.toggleDrawer()
    router.push('/checkout')
}

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price).replace('$', '$ ')
}
</script>

<template>
    <!-- Overlay -->
    <Transition
        enter-active-class="transition-opacity duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-400 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
    >
        <div v-if="isDrawerOpen" 
            @click="cartStore.toggleDrawer"
            class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-9998"
        ></div>
    </Transition>

    <!-- Drawer -->
    <Transition
        enter-active-class="transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-400 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
    >
        <div v-if="isDrawerOpen" 
            class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.2)] z-9999 flex flex-col"
        >
            <!-- Header -->
            <div class="p-8 border-b border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white relative">
                        <ShoppingBag :size="20" />
                        <span v-if="totalItems > 0" class="absolute -top-2 -right-2 bg-amber-500 text-slate-950 font-black text-[10px] w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                            {{ totalItems }}
                        </span>
                    </div>
                    <div>
                        <h2 class="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Tu Carrito</h2>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">VintageTone Collection</p>
                    </div>
                </div>
                <button @click="cartStore.toggleDrawer" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-950 cursor-pointer">
                    <X :size="24" />
                </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div v-if="items.length === 0" class="h-full flex flex-col items-center justify-center space-y-8 text-center px-4">
                    <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <ShoppingBag :size="48" />
                    </div>
                    <div class="space-y-4">
                        <h3 class="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">Tu carrito está vacío</h3>
                        <p class="text-slate-400 font-medium leading-relaxed">Parece que aún no has encontrado ese tono especial. Explora nuestra colección vintage.</p>
                    </div>
                    <button @click="cartStore.toggleDrawer" class="bg-slate-950 text-white rounded-2xl py-5 px-10 font-black uppercase italic tracking-widest text-xs hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer">
                        Ir al catálogo
                    </button>
                </div>

                <div v-else class="space-y-8">
                    <div v-for="item in items" :key="item._id || item.id" class="flex gap-6 group">
                        <!-- Item Image -->
                        <div class="w-24 h-32 bg-slate-100 rounded-2xl overflow-hidden relative shrink-0 border border-slate-100">
                            <img :src="item.images?.length > 0 ? item.images[0] : item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        </div>

                        <!-- Item Info -->
                        <div class="flex-1 flex flex-col justify-between py-1">
                            <div class="space-y-1">
                                <div class="flex items-start justify-between">
                                    <h4 class="text-sm font-black text-slate-950 uppercase italic tracking-tight pr-4">
                                        {{ item.name }}
                                    </h4>
                                    <button @click="cartStore.removeItem(item._id || item.id)" class="text-slate-300 hover:text-red-500 transition-colors cursor-pointer">
                                        <Trash2 :size="16" />
                                    </button>
                                </div>
                                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ item.category }}</p>
                            </div>

                            <div class="flex items-center justify-between mt-4">
                                <!-- Qty Selector -->
                                <div class="flex items-center bg-slate-50 rounded-xl p-0.5 border border-slate-100">
                                    <button @click="cartStore.addItem(item, -1)" :disabled="item.quantity <= 1" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all text-slate-400 hover:text-slate-950 disabled:opacity-30 cursor-pointer">
                                        <Minus :size="12" />
                                    </button>
                                    <span class="w-8 text-center text-xs font-black italic">{{ item.quantity }}</span>
                                    <button @click="cartStore.addItem(item, 1)" :disabled="item.quantity >= (item.stock || 0)" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all text-slate-400 hover:text-slate-950 disabled:opacity-30 cursor-pointer">
                                        <Plus :size="12" />
                                    </button>
                                </div>
                                <div class="text-right">
                                    <p v-if="item.discount > 0" class="text-[10px] font-bold text-slate-400 line-through decoration-red-500/50 mb-0.5">
                                        {{ formatPrice((typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/,/g, ''))) * item.quantity) }}
                                    </p>
                                    <p class="text-base font-black text-slate-950 italic">
                                        {{ formatPrice(
                                            (typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/,/g, ''))) * 
                                            (1 - (item.discount || 0) / 100) * 
                                            item.quantity
                                        ) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div v-if="items.length > 0" class="p-8 border-t border-slate-100 space-y-6 bg-slate-50/50">
                <div class="space-y-4">
                    <div class="flex items-center justify-between text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <span>Envío</span>
                        <span class="text-emerald-500">Gratis</span>
                    </div>
                    <div v-if="totalSavings > 0" class="flex items-center justify-between bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl mt-2 animate-pulse">
                        <span>Ahorro Total</span>
                        <span>- {{ formatPrice(totalSavings) }}</span>
                    </div>
                    <div class="pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                        <span class="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Total</span>
                        <span class="text-2xl font-black text-slate-950 italic">{{ formatPrice(totalPrice) }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button @click="cartStore.clearCart" class="bg-white border-2 border-slate-200 text-slate-500 rounded-2xl py-4 font-black uppercase italic tracking-widest text-[10px] hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer">
                        Vaciar
                    </button>
                    <button @click="goToCheckout" class="bg-slate-950 text-white rounded-2xl py-4 font-black uppercase italic tracking-widest text-[10px] hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2 group cursor-pointer">
                        Finalizar
                        <ArrowRight :size="14" class="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
}
</style>
