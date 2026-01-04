<script setup>
import { ref, computed } from 'vue'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

// Validations
const isEmailValid = computed(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email.value)
})

const isPasswordValid = computed(() => password.value.length >= 6)
const arePasswordsMatching = computed(() => password.value === confirmPassword.value)
const isNameValid = computed(() => name.value.trim().length > 2)

const isFormValid = computed(() => {
    return isNameValid.value && 
           isEmailValid.value && 
           isPasswordValid.value && 
           arePasswordsMatching.value
})

const handleRegister = async () => {
    if (!isFormValid.value) return

    isLoading.value = true
    // Simulando una llamada a la API
    setTimeout(() => {
        isLoading.value = false
        toast.success('Cuenta creada con éxito. ¡Bienvenido!')
    }, 1500)
}
</script>

<template>
    <div class="w-full max-w-md space-y-8 p-4">
        <div class="space-y-2">
            <h2 class="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">
                Crea tu cuenta
            </h2>
            <p class="text-slate-500 font-medium text-sm uppercase tracking-widest">
                Únete a la comunidad de VintageTone
            </p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
            <!-- Nombre -->
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Nombre Completo</label>
                <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    </div>
                    <input 
                        v-model="name"
                        type="text" 
                        required
                        placeholder="Juan Pérez"
                        class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400"
                    />
                </div>
            </div>

            <!-- Email -->
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Email</label>
                <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    </div>
                    <input 
                        v-model="email"
                        type="email" 
                        required
                        placeholder="tu@email.com"
                        class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400"
                    />
                </div>
            </div>

            <!-- Password -->
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Contraseña</label>
                <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    </div>
                    <input 
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'" 
                        required
                        placeholder="••••••••"
                        class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400"
                    />
                    <button 
                        type="button"
                        @click="showPassword = !showPassword"
                        class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <Eye v-if="!showPassword" :size="18" />
                        <EyeOff v-else :size="18" />
                    </button>
                </div>
            </div>

            <!-- Confirm Password -->
            <div class="space-y-2">
                <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Confirmar Contraseña</label>
                <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    </div>
                    <input 
                        v-model="confirmPassword"
                        :type="showPassword ? 'text' : 'password'" 
                        required
                        placeholder="••••••••"
                        class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400"
                    />
                </div>
            </div>

            <!-- Submit Button -->
            <button 
                type="submit"
                :disabled="!isFormValid || isLoading"
                class="w-full bg-slate-950 text-white rounded-2xl py-5 font-black uppercase italic tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-amber-500 hover:text-slate-950 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
            >
                <span v-if="!isLoading">Registrarme</span>
                <span v-else class="loading loading-spinner loading-sm"></span>
                <ArrowRight v-if="!isLoading" :size="18" class="group-hover:translate-x-1 transition-transform" />
            </button>

            <!-- Login Link -->
            <p class="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                ¿Ya tienes una cuenta? 
                <router-link to="/login" class="text-slate-950 hover:text-amber-600 transition-colors border-b-2 border-slate-100 hover:border-amber-500 inline-block">
                    Inicia Sesión
                </router-link>
            </p>
        </form>
    </div>
</template>
