<script setup>
import { Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-vue-next'
</script>

<template>
  <footer class="bg-white text-slate-500 py-16 px-6 border-t border-slate-100 mt-20">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="space-y-6 col-span-1 md:col-span-2">
        <div class="flex items-center">
          <router-link to="/" class="flex flex-col items-start cursor-pointer no-underline group">
             <span class="text-3xl font-bold text-slate-950 tracking-[-0.05em] font-logo italic">
              VintageTone
            </span>
          </router-link>
        </div>
        <p class="max-w-xs text-xs leading-relaxed text-slate-500 font-medium uppercase tracking-wider">
          Tu destino definitivo para el equipamiento musical con alma. Seleccionamos instrumentos que cuentan una historia.
        </p>
        <div class="space-y-3 pt-4">
          <div class="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <MapPin :size="14" class="text-slate-300" />
            <span>Calle Falsa 123, Buenos Aires</span>
          </div>
          <div class="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Phone :size="14" class="text-slate-300" />
            <span>+54 11 1234 5678</span>
          </div>
          <div class="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <Mail :size="14" class="text-slate-300" />
            <span>hola@vintagetone.com</span>
          </div>
        </div>
      </div>

      <div>
        <h4 class="text-slate-900 font-black mb-6 uppercase text-[10px] tracking-[0.2em]">Explorar</h4>
        <ul class="space-y-3 text-[11px] font-bold uppercase tracking-widest">
          <li><a class="hover:text-amber-600 transition-colors cursor-pointer">Colección Vintage</a></li>
          <li><a class="hover:text-amber-600 transition-colors cursor-pointer">Novedades</a></li>
          <li><a class="hover:text-amber-600 transition-colors cursor-pointer">Ofertas</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-slate-900 font-black mb-6 uppercase text-[10px] tracking-[0.2em]">Soporte</h4>
        <ul class="space-y-3 text-[11px] font-bold uppercase tracking-widest">
          <li><a class="hover:text-amber-600 transition-colors cursor-pointer">Contacto</a></li>
          <li><a class="hover:text-amber-600 transition-colors cursor-pointer">Envíos</a></li>
          <li><a class="hover:text-amber-600 transition-colors cursor-pointer">Garantía</a></li>
        </ul>
      </div>
    </div>
    
    <div class="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.2em] uppercase font-black text-slate-300">
      <p>&copy; 2026 VintageTone Music Store. Todos los derechos reservados.</p>
      <div class="flex space-x-8 mt-6 md:mt-0">
        <a class="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2">
          <Instagram :size="14" />
          Instagram
        </a>
        <a class="hover:text-slate-950 transition-colors cursor-pointer flex items-center gap-2">
          <Youtube :size="14" />
          YouTube
        </a>
      </div>
    </div>
  </footer>
</template>
