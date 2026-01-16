<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../../stores/product'
import { Search, X, Loader2, ArrowRight, ExternalLink } from 'lucide-vue-next'

const props = defineProps({
    isMobile: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const router = useRouter()
const productStore = useProductStore()

const query = ref('')
const isExpanded = ref(false)
const showResults = ref(false)
const searchContainer = ref(null)

let debounceTimeout = null

const handleInput = () => {
    if (debounceTimeout) clearTimeout(debounceTimeout)
    
    if (query.value.trim().length > 1) {
        showResults.value = true
        debounceTimeout = setTimeout(() => {
            productStore.searchProductsAction(query.value)
        }, 300)
    } else {
        showResults.value = false
    }
}

const handleEnter = () => {
    if (query.value.trim()) {
        router.push({ name: 'SearchResults', query: { q: query.value } })
        closeSearch()
    }
}

const goToProduct = (id) => {
    router.push(`/product/${id}`)
    closeSearch()
}

const closeSearch = () => {
    showResults.value = false
    isExpanded.value = false
    query.value = ''
    emit('close')
}

const handleClickOutside = (event) => {
    if (searchContainer.value && !searchContainer.value.contains(event.target)) {
        showResults.value = false
        isExpanded.value = false
    }
}

onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
    <div ref="searchContainer" class="relative max-w-md w-full mx-4 group">
        <!-- Search Input -->
        <div class="relative flex items-center h-10 transition-all duration-300 "
            :class="isExpanded ? 'w-full' : 'w-full'">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            </div>
            <input 
                v-model="query"
                type="text"
                placeholder="Buscar guitarras, pedales..."
                class="block w-full h-full bg-slate-100 border-slate-300 shadow-md pl-10 pr-10  border-2 text-slate-900 text-sm font-bold uppercase tracking-wider rounded-2xl focus:border-amber-500/50 focus:outline-none focus:ring-4 focus:ring-amber-500/10 transition-all placeholder:text-slate-300 placeholder:normal-case italic"
                @input="handleInput"
                @focus="isExpanded = true"
                @keydown.enter="handleEnter"
            />
            <div v-if="query || isExpanded" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button @click="closeSearch" class="text-slate-300 hover:text-slate-600 transition-colors">
                    <X :size="18" />
                </button>
            </div>
        </div>

        <!-- Predictive Results Modal/Dropdown -->
        <div v-if="showResults && query.length > 1" 
             class="absolute top-12 left-0 right-0 bg-white border border-slate-100 shadow-2xl rounded-3xl overflow-hidden z-100 animate-in fade-in slide-in-from-top-2 duration-300">
            
            <div class="p-6 max-h-[400px] overflow-y-auto no-scrollbar">
                <!-- Loading State -->
                <div v-if="productStore.isLoading" class="flex flex-col items-center justify-center py-8 space-y-3">
                    <Loader2 :size="32" class="text-amber-500 animate-spin" />
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Buscando...</p>
                </div>

                <!-- Results -->
                <div v-else-if="productStore.searchResults.length > 0" class="space-y-4">
                    <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Resultados para "{{ query }}"</p>
                    
                    <div v-for="product in productStore.searchResults.slice(0, 5)" 
                         :key="product._id"
                         @click="goToProduct(product._id)"
                         class="group/item flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-slate-100">
                        
                        <div class="w-14 h-14 bg-white rounded-xl overflow-hidden border border-slate-100 shrink-0">
                            <img :src="product.images?.[0] || product.image" :alt="product.name" class="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-500" />
                        </div>
                        
                        <div class="grow min-w-0">
                            <h4 class="text-sm font-black text-slate-900 uppercase italic truncate tracking-tight">{{ product.name }}</h4>
                            <div class="flex items-center gap-2">
                                <span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest">{{ product.category }}</span>
                                <span class="text-xs font-black text-slate-900">${{ product.price.toLocaleString() }}</span>
                            </div>
                        </div>
                        
                        <div class="opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <ArrowRight :size="16" class="text-slate-300 group-hover/item:text-amber-500 group-hover/item:translate-x-1 transition-all" />
                        </div>
                    </div>

                    <!-- "See all" button -->
                    <button @click="handleEnter" class="w-full mt-4 p-4 bg-slate-950 text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-slate-950 transition-all font-black uppercase italic tracking-widest text-[10px]">
                        Ver todos los resultados
                        <ExternalLink :size="14" />
                    </button>
                </div>

                <!-- No Results -->
                <div v-else class="text-center py-10 space-y-4">
                    <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto">
                        <Search :size="24" class="text-slate-300" />
                    </div>
                    <div>
                        <p class="text-sm font-black text-slate-900 uppercase italic">Sin resultados</p>
                        <p class="text-xs font-medium text-slate-400">No encontramos productos para "{{ query }}"</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
