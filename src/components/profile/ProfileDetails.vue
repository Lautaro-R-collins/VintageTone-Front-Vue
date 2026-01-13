<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="bg-white rounded-3xl p-8 border border-slate-100">
      <h2 class="text-2xl font-black text-slate-950 uppercase italic tracking-tighter mb-6 flex items-center gap-3">
        Detalles de la Cuenta
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <div>
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Nombre de Usuario</label>
            <p class="font-bold text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-100">{{ user?.userName }}</p>
          </div>
          <div>
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">ID de Usuario</label>
            <p class="font-bold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs break-all">{{ user?.id }}</p>
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Tipo de Cuenta</label>
            <p class="font-bold text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {{ user?.isAdmin ? 'Administrador' : 'Cliente Estándar' }}
            </p>
          </div>
          <div class="bg-amber-50 p-6 rounded-2xl border border-amber-100">
            <p class="text-amber-800 text-xs font-bold uppercase tracking-widest mb-2 italic">¿Necesitas ayuda?</p>
            <p class="text-amber-900/70 text-sm leading-relaxed">Si necesitas cambiar tus datos o tienes problemas con tu cuenta, contacta con nuestro soporte.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
