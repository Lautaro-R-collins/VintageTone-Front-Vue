<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Minus, ShoppingBag, CreditCard, ShieldCheck, Truck } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const cartStore = useCartStore()
const router = useRouter()
const quantity = ref(1)

const increment = () => {
    if (quantity.value < props.product.stock) quantity.value++
}

const decrement = () => {
    if (quantity.value > 1) quantity.value--
}

const addToCart = () => {
    cartStore.addItem(props.product, quantity.value)
}

const buyNow = () => {
    cartStore.addItem(props.product, quantity.value)
    router.push('/checkout')
}
</script>

<template>
    <div class="space-y-10">
        <!-- Header Info -->
        <div class="space-y-4">
            <span class="text-amber-500 font-black uppercase text-xs tracking-[0.3em] italic">
                {{ product.category }} / {{ product.badge }}
            </span>
            <h1 class="text-4xl md:text-5xl font-black text-slate-950 uppercase italic tracking-tighter leading-tight">
                {{ product.name }}
            </h1>
            <div class="flex items-center gap-4">
                <div class="flex flex-col">
                    <span v-if="product.discount > 0" class="text-sm font-bold text-slate-400 line-through decoration-red-500/50">
                        ${{ (typeof product.price === 'number' ? product.price : parseFloat(String(product.price).replace(/,/g, ''))).toLocaleString() }}
                    </span>
                    <span class="text-4xl font-black text-slate-900">
                        ${{ (
                            (typeof product.price === 'number' ? product.price : parseFloat(String(product.price).replace(/,/g, ''))) * 
                            (1 - (product.discount || 0) / 100)
                        ).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}
                    </span>
                </div>
                <div class="flex flex-col gap-2">
                    <span v-if="product.discount > 0" class="badge bg-red-50 text-red-600 border-none font-black px-3 py-1 text-[10px] uppercase tracking-widest">
                        ¡Ahorra {{ product.discount }}%!
                    </span>
                    <span v-if="product.stock > 0" class="badge bg-emerald-50 text-emerald-600 border-none font-bold p-3">
                        En Stock ({{ product.stock }})
                    </span>
                    <span v-else class="badge bg-red-50 text-red-600 border-none font-bold p-3">
                        Sin Stock
                    </span>
                </div>
            </div>
        </div>

        <!-- Description -->
        <div class="space-y-4">
            <h3 class="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Descripción</h3>
            <p class="text-slate-600 font-medium leading-relaxed text-lg">
                {{ product.description || 'No hay descripción disponible para este producto en este momento.' }}
            </p>
        </div>

        <!-- Specs Grid -->
        <div v-if="product.specs" class="grid grid-cols-2 gap-6 p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <div v-for="spec in product.specs" :key="spec.label" class="space-y-1">
                <p class="text-[9px] font-black uppercase tracking-widest text-slate-400">{{ spec.label }}</p>
                <p class="text-sm font-bold text-slate-900 uppercase italic">{{ spec.value }}</p>
            </div>
        </div>

        <!-- Purchase Actions -->
        <div class="space-y-6 pt-4">
            <div class="flex flex-col sm:flex-row gap-4">
                <!-- Quantity Selector -->
                <div class="flex items-center bg-slate-900 border-2 border-slate-100 rounded-2xl p-1 shadow-sm">
                    <button @click="decrement"
                        class="p-4 hover:bg-slate-50 cursor-pointer rounded-xl transition-colors text-white hover:text-slate-950 disabled:opacity-30"
                        :disabled="quantity <= 1">
                        <Minus :size="18" />
                    </button>
                    <span class="w-12 text-center text-white font-black text-xl italic">{{ quantity }}</span>
                    <button @click="increment"
                        class="p-4 hover:bg-slate-50 cursor-pointer rounded-xl transition-colors text-white hover:text-slate-950 disabled:opacity-30"
                        :disabled="quantity >= product.stock">
                        <Plus :size="18" />
                    </button>
                </div>

                <!-- Add to Cart -->
                <button @click="addToCart"
                    class="grow bg-slate-900 text-white rounded-2xl py-5 px-8 font-black uppercase italic tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-amber-500 hover:text-slate-950 transition-all active:scale-[0.98] group cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    :disabled="(product.stock || 0) <= 0">
                    <ShoppingBag :size="20" class="group-hover:-translate-y-1 transition-transform" />
                    Añadir al Carrito
                </button>
            </div>

            <!-- Buy Now -->
            <button @click="buyNow"
                class="w-full bg-amber-500 text-slate-950 rounded-2xl py-5 font-black uppercase italic tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-amber-600 transition-all active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="(product.stock || 0) <= 0">
                <CreditCard :size="20" />
                Comprar Ahora
            </button>
        </div>

        <!-- Trust Badges -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div class="flex items-center gap-3 text-slate-500">
                <ShieldCheck :size="20" class="text-emerald-500" />
                <span class="text-[10px] uppercase font-bold tracking-widest">Garantía Certificada</span>
            </div>
            <div class="flex items-center gap-3 text-slate-500">
                <Truck :size="20" class="text-amber-500" />
                <span class="text-[10px] uppercase font-bold tracking-widest">Envío Asegurado 24/48h</span>
            </div>
        </div>
    </div>
</template>
