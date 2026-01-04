<script setup>
import CheckoutForm from '../components/checkout/CheckoutForm.vue'
</script>

<template>
    <div class="min-h-screen flex">
        <!-- Image Side (Left) -->
        <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-950 group">
            <!-- Background Image -->
            <img src="https://images.unsplash.com/photo-1519508234439-4f23643125c1?q=80&w=2000&auto=format&fit=crop"
                alt="VintageTone Checkout"
                class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[20s] ease-linear" />

            <!-- Overlay Content -->
            <div class="relative z-10 flex flex-col justify-end p-20 space-y-6">
                <div class="space-y-2">
                    <span class="text-amber-500 font-black uppercase text-xs tracking-[0.4em]">Casi es tuyo</span>
                    <h1
                        class="text-5xl font-black text-white italic uppercase tracking-tighter leading-tight drop-shadow-2xl">
                        A un paso de <br />
                        <span class="text-amber-500 italic">La Perfección.</span>
                    </h1>
                </div>
                <p class="text-slate-200 font-medium text-lg leading-relaxed max-w-sm drop-shadow-md">
                    Completa tus datos para asegurar el envío de tu equipamiento. Garantizamos el embalaje más seguro para tus joyas vintage.
                </p>
            </div>

            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
        </div>

        <!-- Form Side (Right) -->
        <div class="w-full lg:w-1/2 bg-white overflow-y-auto">
            <div class="min-h-full flex items-center justify-center py-12 px-6 sm:px-12">
                <CheckoutForm />
            </div>
        </div>
    </div>
</template>
