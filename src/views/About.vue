<script setup>
import AboutCard from '../components/about/AboutCard.vue'
import TeamCard from '../components/about/TeamCard.vue'
import { teamMembers } from '../mocks/team'

const sections = [
  {
    title: "Nuestra Historia",
    text: "Nacimos de la pasión por los instrumentos que han definido épocas. En VintageTone, no solo vendemos equipo; curamos piezas de historia musical que conservan su alma y carácter a través del tiempo.",
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=2070&auto=format&fit=crop",
    isReversed: false
  },
  {
    title: "Curaduría Experta",
    text: "Cada guitarra, bajo y amplificador que llega a nuestras manos pasa por un riguroso proceso de verificación y ajuste. Nuestro compromiso es que cada pieza que adquieras esté lista para crear nuevas leyendas.",
    image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=2070&auto=format&fit=crop",
    isReversed: true
  }
]
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-20 min-h-screen relative">
    <!-- Background Title (Decorative) -->
    <h1
      class="text-7xl md:text-9xl font-black text-slate-200 absolute -top-10 left-0 -z-10 uppercase italic tracking-tighter opacity-30 select-none">
      VintageTone
    </h1>

    <!-- Page Intro -->
    <header class="max-w-3xl mb-16 space-y-6">
      <h1 class="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
        Sobre nosotros
      </h1>
      <p class="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
        Desde 1994, VintageTone ha sido el refugio para músicos que no solo buscan una herramienta, sino un compañero de
        viaje. Nuestra tienda nació en el corazón de un taller de luthier, rescatando la magia de las maderas añejas y
        los circuitos analógicos que definieron el rock, el funk y el blues.
      </p>
    </header>

    <!-- Detailed Sections -->
    <div class="space-y-10">
      <AboutCard v-for="(section, index) in sections" :key="index" v-bind="section" />
    </div>

    <!-- Team Section -->
    <section class="mt-32">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="space-y-2">
            <span class="text-amber-500 font-black uppercase text-[10px] tracking-[0.4em]">
                Expertos al servicio
            </span>
            <h2 class="text-4xl md:text-6xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                Nuestro equipo</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <TeamCard 
          v-for="member in teamMembers" 
          :key="member.id"
          v-bind="member"
        />
      </div>
    </section>
  </div>
</template>
