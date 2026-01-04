<script setup>
import { ref, computed } from 'vue'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)

const touched = ref({
    email: false,
    password: false
})

// Validations
const isEmailValid = computed(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email.value)
})

const isPasswordValid = computed(() => password.value.length >= 6)

const isFormValid = computed(() => isEmailValid.value && isPasswordValid.value)

const handleLogin = async () => {
    if (!isFormValid.value) return

    isLoading.value = true
    setTimeout(() => {
        isLoading.value = false
        toast.success('¡Bienvenido de nuevo!')
    }, 1200)
}
</script>

<template>
    <div class="w-full max-w-md space-y-8 p-4">
        <div class="space-y-2">
            <h2 class="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">
                Bienvenido
            </h2>
            <p class="text-slate-500 font-medium text-sm uppercase tracking-widest">
                Ingresa tus credenciales para continuar
            </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
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
                        @blur="touched.email = true"
                        placeholder="tu@email.com"
                        class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-amber-500 focus:bg-white transition-all font-bold text-slate-900 placeholder:text-slate-400"
                    />
                </div>
                <!-- Error Messages -->
                <p v-if="touched.email && !email" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">
                    Completa este campo
                </p>
                <p v-else-if="email && !isEmailValid" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">
                    Ingresa un correo electrónico válido
                </p>
            </div>

            <!-- Password -->
            <div class="space-y-2">
                <div class="flex justify-between items-center ml-1">
                    <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Contraseña</label>
                    <a href="#" class="text-[10px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-500 transition-colors">¿Olvidaste tu contraseña?</a>
                </div>
                <div class="relative group">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock :size="18" class="text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    </div>
                    <input 
                        v-model="password"
                        :type="showPassword ? 'text' : 'password'" 
                        required
                        @blur="touched.password = true"
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
                <!-- Error Messages -->
                <p v-if="touched.password && !password" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">
                    Completa este campo
                </p>
                <p v-else-if="password && !isPasswordValid" class="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1 mt-1">
                    La contraseña debe tener al menos 6 caracteres
                </p>
            </div>

            <!-- Submit Button -->
            <button 
                type="submit"
                :disabled="!isFormValid || isLoading"
                class="w-full bg-slate-950 text-white rounded-2xl py-5 font-black uppercase italic tracking-widest text-sm flex items-center justify-center gap-4 hover:bg-amber-500 hover:text-slate-950 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
            >
                <span v-if="!isLoading">Iniciar Sesión</span>
                <span v-else class="loading loading-spinner loading-sm"></span>
                <ArrowRight v-if="!isLoading" :size="18" class="group-hover:translate-x-1 transition-transform" />
            </button>

            <!-- Register Link -->
            <p class="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
                ¿No tienes una cuenta? 
                <router-link to="/register" class="text-slate-950 hover:text-amber-600 transition-colors border-b-2 border-slate-100 hover:border-amber-500 inline-block">
                    Regístrate gratis
                </router-link>
            </p>
        </form>
    </div>
</template>
