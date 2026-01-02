<script setup>
import { ref } from 'vue'

const form = ref({
    name: '',
    email: '',
    message: ''
})

const handleSubmit = () => {
    console.log('Form submitted:', form.value)
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.')
    form.value = { name: '', email: '', message: '' }
}
</script>   

<template>
    <form @submit.prevent="handleSubmit" class="space-y-6 shadow-2xl bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100">
        <div class="space-y-2">
            <label for="name" class="text-[10px] font-black uppercase tracking-widest text-slate-800 ml-1">Nombre Completo</label>
            <input 
                v-model="form.name"
                id="name"
                type="text" 
                placeholder="Escribe tu nombre" 
                required
                class="w-full bg-white border border-slate-200 px-6 py-4 rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
            />
        </div>

        <div class="space-y-2">
            <label for="email" class="text-[10px] font-black uppercase tracking-widest text-slate-800 ml-1">Correo Electrónico</label>
            <input 
                v-model="form.email"
                id="email"
                type="email" 
                placeholder="tu@email.com" 
                required
                class="w-full bg-white border border-slate-200 px-6 py-4 rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
            />
        </div>

        <div class="space-y-2">
            <label for="message" class="text-[10px] font-black uppercase tracking-widest text-slate-800 ml-1">Tu Mensaje</label>
            <textarea 
                v-model="form.message"
                id="message"
                rows="4" 
                placeholder="¿En qué podemos ayudarte?" 
                required
                class="w-full bg-white border border-slate-200 px-6 py-4 rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium resize-none"
            ></textarea>
        </div>

        <button 
            type="submit"
            class="w-full cursor-pointer bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 px-8 py-5 rounded-xl font-black uppercase italic tracking-widest text-xs transition-all flex items-center justify-center gap-3 group shadow-lg active:scale-[0.98]"
        >
            <span>Enviar Mensaje</span>
        </button>
    </form>
</template>
