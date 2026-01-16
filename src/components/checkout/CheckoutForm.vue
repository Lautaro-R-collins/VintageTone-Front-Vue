<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'
import { 
    TriangleAlert, CheckCircle, Loader2, ArrowRight,
    User, Mail, Phone, MapPin, Hash, Building, Globe 
} from 'lucide-vue-next'

const router = useRouter()
const cartStore = useCartStore()

const loading = ref(false)
const orderId = ref(null)
const showModal = ref(false)

// Form Fields
const name = ref('')
const email = ref('')
const phone = ref('')
const country = ref('')
const zip = ref('')
const street = ref('')
const number = ref('')
const floor = ref('')

const touched = ref({
    name: false,
    email: false,
    phone: false,
    country: false,
    zip: false,
    street: false,
    number: false
})

const countries = [
    "Argentina", "Brasil", "Chile", "Uruguay", "Paraguay",
    "Bolivia", "Perú", "Colombia", "México", "España"
]

// Validation Logic
const isNameValid = computed(() => name.value.trim().length >= 3)
const isEmailValid = computed(() => /^\S+@\S+\.\S+$/.test(email.value))
const isPhoneValid = computed(() => phone.value.trim().length >= 6)
const isCountryValid = computed(() => country.value !== '')
const isZipValid = computed(() => zip.value.trim().length > 0)
const isStreetValid = computed(() => street.value.trim().length > 0)
const isNumberValid = computed(() => number.value.trim().length > 0)

const isFormValid = computed(() =>
    isNameValid.value &&
    isEmailValid.value &&
    isPhoneValid.value &&
    isCountryValid.value &&
    isZipValid.value &&
    isStreetValid.value &&
    isNumberValid.value
)

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price).replace('$', '$ ')
}

const handleSubmit = async () => {
    if (!isFormValid.value) return
    loading.value = true
    // Simulate API Call
    setTimeout(() => {
        orderId.value = Math.random().toString(36).substr(2, 9).toUpperCase()
        loading.value = false
        showModal.value = true
        cartStore.clearCart() 
    }, 2000)
}

const closeModal = () => {
    showModal.value = false
    router.push('/')
}
</script>

<template>
    <div class="w-full max-w-lg space-y-8">
        <!-- Header -->
        <div class="space-y-2">
            <h2 class="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">
                Finalizar Compra
            </h2>
            <p class="text-slate-500 font-medium text-sm uppercase tracking-widest">
                Completa tus datos de envío
            </p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            
            <!-- Purchaser Data Section -->
            <div class="space-y-6">
                <div class="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <User :size="16" class="text-amber-500" />
                    <h3 class="font-black text-slate-900 uppercase tracking-widest text-[10px]">Tus Datos</h3>
                </div>

                <div class="grid gap-6">
                    <!-- Name -->
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Nombre Completo</label>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                            </div>
                            <input v-model="name" @blur="touched.name = true" type="text" placeholder="Juan Pérez"
                                class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400" />
                        </div>
                        <p v-if="touched.name && !isNameValid" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">Completa este campo</p>
                    </div>

                    <!-- Email & Phone Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- Email -->
                        <div class="space-y-2">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                                </div>
                                <input v-model="email" @blur="touched.email = true" type="email" placeholder="tu@email.com"
                                    class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400" />
                            </div>
                            <p v-if="touched.email && !isEmailValid" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">Email inválido</p>
                        </div>
                        
                        <!-- Phone -->
                        <div class="space-y-2">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Teléfono</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                                </div>
                                <input v-model="phone" @blur="touched.phone = true" type="tel" placeholder="+54 11..."
                                    class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400" />
                            </div>
                            <p v-if="touched.phone && !isPhoneValid" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">Teléfono inválido</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Shipping Data Section -->
            <div class="space-y-6">
                <div class="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <MapPin :size="16" class="text-amber-500" />
                    <h3 class="font-black text-slate-900 uppercase tracking-widest text-[10px]">Dirección</h3>
                </div>

                <div class="grid gap-6">
                    <!-- Country & Zip -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">País</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Globe :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                                </div>
                                <select v-model="country" @blur="touched.country = true"
                                    class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 appearance-none cursor-pointer">
                                    <option value="" disabled>Seleccioná...</option>
                                    <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
                                </select>
                            </div>
                            <p v-if="touched.country && !isCountryValid" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">Requerido</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Código Postal</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Hash :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                                </div>
                                <input v-model="zip" @blur="touched.zip = true" type="text" placeholder="CP 1234"
                                    class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400" />
                            </div>
                            <p v-if="touched.zip && !isZipValid" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">Requerido</p>
                        </div>
                    </div>

                    <!-- Street -->
                    <div class="space-y-2">
                        <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Calle</label>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MapPin :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                            </div>
                            <input v-model="street" @blur="touched.street = true" type="text" placeholder="Av. Corrientes"
                                class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400" />
                        </div>
                        <p v-if="touched.street && !isStreetValid" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">Requerido</p>
                    </div>

                    <!-- Number & Floor -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Número</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Hash :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                                </div>
                                <input v-model="number" @blur="touched.number = true" type="text" placeholder="1234"
                                    class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400" />
                            </div>
                            <p v-if="touched.number && !isNumberValid" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">Req.</p>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Piso / Depto</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Building :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                                </div>
                                <input v-model="floor" type="text" placeholder="4B"
                                    class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Summary -->
            <div class="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                <div class="space-y-3">
                    <div class="flex justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span class="text-slate-900">{{ formatPrice(cartStore.subtotalPrice) }}</span>
                    </div>
                    <div v-if="cartStore.totalSavings > 0" class="flex justify-between items-center bg-emerald-50 text-emerald-600 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl">
                        <span>Tu Ahorro</span>
                        <span>- {{ formatPrice(cartStore.totalSavings) }}</span>
                    </div>
                    <div class="flex justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <span>Envío</span>
                        <span class="text-emerald-500 italic">Gratis</span>
                    </div>
                </div>
                <div class="h-px bg-slate-200"></div>
                <div class="flex justify-between items-center pt-2">
                    <span class="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Total Final</span>
                    <span class="text-3xl font-black text-slate-950 italic">{{ formatPrice(cartStore.totalPrice) }}</span>
                </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" :disabled="!isFormValid || loading"
                class="w-full bg-slate-900 text-white rounded-2xl py-5 font-black uppercase italic tracking-widest text-sm hover:bg-amber-500 hover:text-slate-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 cursor-pointer group shadow-lg hover:shadow-amber-500/20">
                <span v-if="!loading">Confirmar y Pagar</span>
                <Loader2 v-else class="animate-spin" :size="20" />
                <ArrowRight v-if="!loading" :size="20" class="group-hover:translate-x-1 transition-transform" />
            </button>
        </form>

        <!-- Success Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-4xl p-10 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300 border-4 border-slate-100">
                <div class="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-500 relative">
                    <div class="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20"></div>
                    <CheckCircle :size="48" stroke-width="3" />
                </div>
                <h2 class="text-3xl font-black text-slate-950 uppercase italic tracking-tighter mb-4">¡Orden Confirmada!</h2>
                <p class="text-slate-500 font-medium mb-8 leading-relaxed">Tu equipamiento ya tiene dueño. Te enviamos los detalles a tu email.</p>
                
                <div class="bg-slate-50 rounded-2xl p-6 mb-8 border-2 border-slate-100 border-dashed">
                    <p class="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-2">ID de Seguimiento</p>
                    <p class="text-3xl font-black text-slate-900 font-mono tracking-widest">{{ orderId }}</p>
                </div>

                <button @click="closeModal"
                    class="w-full bg-slate-900 text-white rounded-2xl py-5 font-black uppercase italic tracking-widest text-xs hover:bg-slate-800 transition-all cursor-pointer shadow-xl">
                    Volver a la tienda
                </button>
            </div>
        </div>
    </div>
</template>
