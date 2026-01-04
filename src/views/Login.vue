<script setup>
import LoginForm from '../components/login/LoginForm.vue'
</script>

<template>
    <div class="min-h-[80vh] flex">
        <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-950 group">
            <!-- Background Image -->
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop"
                alt="VintageTone Login"
                class="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[20s] ease-linear" />

            <!-- Overlay Content -->
            <div class="relative z-10 flex flex-col justify-end p-20 space-y-6">
                <div class="space-y-2">
                    <span class="text-amber-500 font-black uppercase text-xs tracking-[0.4em]">Experiencia
                        Personalizada</span>
                    <h1
                        class="text-5xl font-black text-white italic uppercase tracking-tighter leading-tight drop-shadow-2xl">
                        Vuelve a tu <br />
                        <span class="text-amber-500 italic">Espacio Musical.</span>
                    </h1>
                </div>
                <p class="text-slate-200 font-medium text-lg leading-relaxed max-w-sm drop-shadow-md">
                    Inicia sesión para gestionar tus pedidos, actualizar tus preferencias y explorar nuevos instrumentos
                    seleccionados para ti.
                </p>
            </div>

            <!-- Overlay -->
            <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
        </div>
        <!-- form -->
        <div class="w-full lg:w-1/2 flex items-center justify-center bg-white py-12 px-6">
            <LoginForm />
        </div>
    </div>
</template>
