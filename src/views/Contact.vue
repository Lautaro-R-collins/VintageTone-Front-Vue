<script setup>
import FormContact from '../components/contact/FormContact.vue'
import Breadcrumbs from '../components/common/Breadcrumbs.vue'
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-vue-next'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hola@vintagetone.com' },
  { icon: Phone, label: 'Teléfono', value: '+54 11 1234 5678' },
  { icon: MapPin, label: 'Dirección', value: 'Av. Corrientes 1234, CABA' }
]

const socials = [
  { icon: Instagram, link: '#' },
  { icon: Facebook, link: '#' },
  { icon: Twitter, link: '#' }
]
</script>

<template>
  <div class="min-h-screen">
    <Breadcrumbs />
    <div class="max-w-7xl mx-auto px-6 py-20 relative overflow-hidden">
      <!-- Background Title (Decorative) -->
      <h1
        class="text-7xl md:text-9xl font-black text-slate-100 absolute top-0 -right-20 -z-10 uppercase italic tracking-tighter opacity-50 select-none rotate-90 origin-top-right">
        Contacto
      </h1>

      <div class="flex flex-col lg:flex-row gap-16 lg:gap-24">
        <!-- Left Column: Info -->
        <div class="flex-1 space-y-12">
          <header class="space-y-6">
            <h1 class="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
              Hablemos
            </h1>
            <p class="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              ¿Buscas un instrumento específico, quieres vender tu equipo o simplemente tienes una duda técnica? Estamos
              aquí para ayudarte a encontrar el tono que buscas.
            </p>
          </header>

          <!-- Details -->
          <div class="space-y-8">
            <div v-for="info in contactInfo" :key="info.label" class="flex items-center gap-6 group">
              <div
                class="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-lg shadow-slate-900/10">
                <component :is="info.icon" :size="24" />
              </div>
              <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">{{
                  info.label }}</p>
                <p class="text-slate-900 font-bold text-lg">{{ info.value }}</p>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="space-y-4 pt-10 border-t border-slate-100">
            <p class="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 ml-1">Síguenos en las redes</p>
            <div class="flex gap-4">
              <a v-for="(social, index) in socials" :key="index" :href="social.link"
                class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all active:scale-90 shadow-sm">
                <component :is="social.icon" :size="20" />
              </a>
            </div>
          </div>
        </div>

        <!-- Right Column: Form -->
        <div class="flex-1">
          <FormContact />
        </div>
      </div>
    </div>
  </div>
</template>
