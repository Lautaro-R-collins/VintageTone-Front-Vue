<script setup>
import { computed, ref } from 'vue'
import { X, Upload, Loader2 } from 'lucide-vue-next'

const props = defineProps({
  isEditing: Boolean,
  isLoading: Boolean,
  form: Object,
  selectedFiles: Array
})

const emit = defineEmits([
  'close', 
  'submit', 
  'update:form', 
  'handle-file-change'
])

const fileInput = ref(null)

const categoryMap = {
  'Instrumentos': ['Guitarras Eléctricas', 'Bajos', 'Acústicos'],
  'Amplificadores': ['Tubulares', 'Transistores'],
  'Efectos': ['Overdrive', 'Distorsión', 'Delay'],
  'Accesorios': ['Púas', 'Correas', 'Soportes', 'Estuches'],
  'Outlet': []
}

const subcategories = computed(() => {
  return categoryMap[props.form.category] || []
})

const handleCategoryChange = (newCategory) => {
  const updatedForm = { 
    ...props.form, 
    category: newCategory, 
    subcategory: '' 
  }
  emit('update:form', updatedForm)
}

const updateField = (field, value) => {
  const updatedForm = { ...props.form, [field]: value }
  emit('update:form', updatedForm)
}

const onFileChange = (e) => {
  emit('handle-file-change', e)
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm">
    <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 class="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">
          {{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}
        </h2>
        <button @click="$emit('close')" class="p-2 hover:bg-slate-100 rounded-xl text-slate-400">
          <X :size="24" />
        </button>
      </div>

      <form @submit.prevent="$emit('submit')" class="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2 lg:col-span-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre</label>
            <input 
              :value="form.name" 
              @input="updateField('name', $event.target.value)"
              type="text" required 
              class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:border-amber-500 outline-none transition-colors">
          </div>
          <div class="space-y-2 lg:col-span-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Descripción</label>
            <textarea 
              :value="form.description" 
              @input="updateField('description', $event.target.value)"
              required rows="4" 
              class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:border-amber-500 outline-none transition-colors"></textarea>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Precio (USD)</label>
            <input 
              :value="form.price" 
              @input="updateField('price', Number($event.target.value))"
              type="number" required 
              class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:border-amber-500 outline-none transition-colors">
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock</label>
            <input 
              :value="form.stock" 
              @input="updateField('stock', Number($event.target.value))"
              type="number" required 
              class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:border-amber-500 outline-none transition-colors">
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Categoría</label>
            <select 
              :value="form.category" 
              @change="(e) => handleCategoryChange(e.target.value)"
              required 
              class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:border-amber-500 outline-none transition-colors appearance-none">
              <option value="" disabled>Seleccionar Categoría</option>
              <option value="Instrumentos">Instrumentos</option>
              <option value="Amplificadores">Amplificadores</option>
              <option value="Efectos">Efectos</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Outlet">Outlet</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Subcategoría</label>
            <select 
              :value="form.subcategory" 
              @change="updateField('subcategory', $event.target.value)"
              :disabled="!form.category || subcategories.length === 0" 
              class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:border-amber-500 outline-none transition-colors appearance-none disabled:opacity-50">
              <option value="">Ninguna / Ver Todos</option>
              <option v-for="sub in subcategories" :key="sub" :value="sub">{{ sub }}</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Marca</label>
            <input 
              :value="form.brand" 
              @input="updateField('brand', $event.target.value)"
              type="text" class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:border-amber-500 outline-none transition-colors">
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Descuento (%)</label>
            <input 
              :value="form.discount" 
              @input="updateField('discount', Number($event.target.value))"
              type="number" 
              class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:border-amber-500 outline-none transition-colors"
              placeholder="0">
          </div>
          <div class="lg:col-span-2 space-y-4">
            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Imágenes (Nueva subida)</label>
            <div @click="fileInput.click()" class="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-colors bg-slate-50/50">
              <Upload :size="24" class="text-slate-400 mb-2" />
              <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Click para seleccionar</p>
              <input ref="fileInput" type="file" multiple @change="onFileChange" class="hidden" accept="image/*" />
            </div>
            <div v-if="selectedFiles.length > 0" class="flex flex-wrap gap-2">
              <span v-for="file in selectedFiles" :key="file.name" class="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {{ file.name }}
              </span>
            </div>
          </div>
        </div>

        <div class="pt-6 flex gap-4">
          <button type="button" @click="$emit('close')" class="grow bg-slate-100 text-slate-600 rounded-2xl py-4 font-black uppercase tracking-widest text-xs hover:bg-slate-200">
            Cancelar
          </button>
          <button type="submit" :disabled="isLoading" class="grow bg-slate-950 text-white rounded-2xl py-4 font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center gap-2">
            <Loader2 v-if="isLoading" class="animate-spin" :size="16" />
            {{ isEditing ? 'Guardar Cambios' : 'Crear Producto' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
