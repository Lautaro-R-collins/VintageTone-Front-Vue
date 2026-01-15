<script setup>
import { 
  LayoutDashboard, 
  Package, 
  Plus, 
  Search, 
  Settings, 
  Users, 
  TrendingUp, 
  ArrowLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  PackageCheck,
  X,
  Upload,
  Loader2
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '../stores/product'
import { toast } from 'vue-sonner'

const router = useRouter()
const productStore = useProductStore()

// Modal State
const isModalOpen = ref(false)
const isEditing = ref(false)
const isLoading = ref(false)
const currentProductId = ref(null)

const form = ref({
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  brand: 'Genérico',
  discount: 0,
  images: []
})

const fileInput = ref(null)
const selectedFiles = ref([])

onMounted(() => {
  productStore.fetchProducts()
})

const stats = computed(() => [
  { label: 'Productos Totales', value: productStore.products.length.toString(), icon: Package, color: 'bg-blue-500' },
  { label: 'Ventas del Mes', value: '$45.2k', icon: TrendingUp, color: 'bg-green-500' },
  { label: 'Usuarios Activos', value: '1,205', icon: Users, color: 'bg-purple-500' },
  { label: 'Stock Bajo', value: productStore.products.filter(p => p.stock < 5).length.toString(), icon: PackageCheck, color: 'bg-amber-500' },
])

const recentProducts = computed(() => productStore.products)

const openModal = (product = null) => {
  if (product) {
    isEditing.value = true
    currentProductId.value = product._id
    form.value = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      brand: product.brand || 'Genérico',
      discount: product.discount || 0
    }
  } else {
    isEditing.value = false
    currentProductId.value = null
    form.value = {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      brand: 'Genérico',
      discount: 0
    }
  }
  selectedFiles.value = []
  isModalOpen.value = true
}

const handleFileChange = (e) => {
  selectedFiles.value = Array.from(e.target.files)
}

const handleSubmit = async () => {
  isLoading.value = true
  const formData = new FormData()
  
  // Append basic fields
  Object.keys(form.value).forEach(key => {
    formData.append(key, form.value[key])
  })

  // Append files
  selectedFiles.value.forEach(file => {
    formData.append('images', file)
  })

  try {
    let result
    if (isEditing.value) {
      result = await productStore.updateProduct(currentProductId.value, formData)
    } else {
      result = await productStore.addProduct(formData)
    }

    if (result.success) {
      toast.success(isEditing.value ? 'Producto actualizado' : 'Producto creado')
      isModalOpen.value = false
    } else {
      toast.error(result.message)
    }
  } catch (error) {
    toast.error('Ocurrió un error inesperado')
  } finally {
    isLoading.value = false
  }
}

const deleteProduct = async (id) => {
  if (confirm('¿Estás seguro de eliminar este producto?')) {
    const result = await productStore.deleteProduct(id)
    if (result.success) {
      toast.success('Producto eliminado')
    } else {
      toast.error(result.message)
    }
  }
}

const goBack = () => {
  router.push('/profile')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div class="space-y-2">
          <button 
            @click="goBack"
            class="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-950 font-bold uppercase tracking-widest text-[10px] transition-colors group">
            <ArrowLeft :size="14" class="group-hover:-translate-x-1 transition-transform" /> Volver al Perfil
          </button>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-slate-950 text-amber-500 flex items-center justify-center shadow-lg">
              <LayoutDashboard :size="24" />
            </div>
            <h1 class="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">
              Panel de Control
            </h1>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative hidden lg:block">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="16" />
            <input 
              type="text" 
              placeholder="Buscar productos..."
              class="bg-white border border-slate-100 pl-12 pr-6 py-3 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-500 shadow-sm w-64"
            />
          </div>
          <button 
            @click="openModal()"
            class="bg-amber-500 text-slate-950 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-950 hover:text-white transition-all flex items-center gap-2 shadow-lg">
            <Plus :size="16" /> Nuevo Producto
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div v-for="stat in stats" :key="stat.label" 
          class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-amber-500 transition-all group overflow-hidden relative">
          <div class="flex items-center justify-between relative z-10">
            <div>
              <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{{ stat.label }}</p>
              <h3 class="text-3xl font-black text-slate-950 italic tracking-tighter">{{ stat.value }}</h3>
            </div>
            <div :class="[stat.color, 'w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform']">
              <component :is="stat.icon" :size="24" />
            </div>
          </div>
          <!-- Background Decoration -->
          <div class="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <component :is="stat.icon" :size="80" />
          </div>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Products Table Column -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div class="p-8 border-b border-slate-50 flex items-center justify-between">
              <h2 class="text-xl font-black text-slate-950 uppercase italic tracking-tighter">Productos Recientes</h2>
              <button class="text-[10px] font-bold uppercase tracking-widest text-amber-600 hover:text-amber-700">Ver todo</button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="bg-slate-50/50">
                    <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Producto</th>
                    <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Categoría</th>
                    <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Estado</th>
                    <th class="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                  <tr v-for="product in recentProducts" :key="product._id || product.id" class="hover:bg-slate-50/30 transition-colors group">
                    <td class="px-8 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                          <img v-if="product.images?.length > 0" :src="product.images[0]" class="w-full h-full object-cover" />
                          <Package v-else :size="20" class="text-slate-400" />
                        </div>
                        <span class="font-bold text-slate-900 text-sm">{{ product.name }}</span>
                      </div>
                    </td>
                    <td class="px-8 py-4">
                      <span class="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">{{ product.category }}</span>
                    </td>
                    <td class="px-8 py-4">
                      <div class="flex items-center gap-2">
                        <div :class="[
                          'w-2 h-2 rounded-full',
                          product.stock > 10 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                          product.stock > 0 ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,44,44,0.5)]'
                        ]"></div>
                        <span class="text-[10px] font-black uppercase tracking-widest text-slate-700">
                          {{ product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock' }}
                        </span>
                      </div>
                    </td>
                    <td class="px-8 py-4 text-right">
                      <div class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          @click="openModal(product)"
                          class="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-amber-500 shadow-sm border border-transparent hover:border-slate-100 cursor-pointer">
                          <Edit :size="16" />
                        </button>
                        <button 
                          @click="deleteProduct(product._id || product.id)"
                          class="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-red-500 shadow-sm border border-transparent hover:border-slate-100 cursor-pointer">
                          <Trash2 :size="16" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Sidebar / Recent Activities -->
        <div class="space-y-6">
          <!-- Quick Config -->
          <div class="bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden group">
            <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Settings :size="120" />
            </div>
            <div class="relative z-10 space-y-4">
              <h3 class="text-2xl font-black italic tracking-tighter uppercase leading-none">Configuración Rápida</h3>
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Ajusta los parámetros globales de la tienda.</p>
              <div class="space-y-3">
                <button class="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between transition-colors text-left group/btn">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                      <Settings :size="16" />
                    </div>
                    <span class="text-xs font-bold uppercase tracking-widest">Tienda</span>
                  </div>
                  <ChevronRight :size="14" class="text-slate-500 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <button class="w-full bg-white/10 hover:bg-white/20 p-4 rounded-2xl flex items-center justify-between transition-colors text-left group/btn">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                      <Users :size="16" />
                    </div>
                    <span class="text-xs font-bold uppercase tracking-widest">Usuarios</span>
                  </div>
                  <ChevronRight :size="14" class="text-slate-500 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <!-- Documentation / Support Help -->
          <div class="bg-amber-50 border border-amber-100 rounded-3xl p-8 relative overflow-hidden">
            <h3 class="text-amber-900 font-black uppercase italic tracking-tighter text-lg mb-2">Ayuda Técnica</h3>
            <p class="text-amber-800/70 text-xs font-bold uppercase tracking-widest leading-relaxed mb-4">
              Si necesitas ayuda con la API o la gestión de datos, consulta la documentación interna.
            </p>
            <button class="text-amber-950 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 group">
              Explorar Guía <ChevronRight :size="14" class="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm">
      <div class="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div class="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950">
              <Package :size="20" />
            </div>
            <h2 class="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">
              {{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}
            </h2>
          </div>
          <button @click="isModalOpen = false" class="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
            <X :size="24" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2 lg:col-span-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre del Producto</label>
              <input v-model="form.name" type="text" required class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-500" placeholder="Ej: Gibson Les Paul Custom">
            </div>

            <div class="space-y-2 lg:col-span-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Descripción</label>
              <textarea v-model="form.description" required rows="4" class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-500" placeholder="Detalles del producto..."></textarea>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Precio (USD)</label>
              <input v-model.number="form.price" type="number" required class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-500" placeholder="0">
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock</label>
              <input v-model.number="form.stock" type="number" required class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-500" placeholder="0">
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Categoría</label>
              <select v-model="form.category" required class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-500 appearance-none">
                <option value="" disabled>Seleccionar categoría</option>
                <option value="Guitarras">Guitarras</option>
                <option value="Bajos">Bajos</option>
                <option value="Amplificadores">Amplificadores</option>
                <option value="Pedales">Pedales</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Marca</label>
              <input v-model="form.brand" type="text" class="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl text-sm font-bold focus:outline-none focus:border-amber-500" placeholder="Gibson, Fender, etc.">
            </div>

            <div class="lg:col-span-2 space-y-4">
              <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Imágenes (Cloudinary)</label>
              <div 
                @click="fileInput.click()"
                class="border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:border-amber-500 transition-colors cursor-pointer bg-slate-50/50 group"
              >
                <div class="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-amber-500 group-hover:scale-110 transition-all">
                  <Upload :size="24" />
                </div>
                <div class="text-center">
                  <p class="text-sm font-bold text-slate-900 italic">Haz click para subir imágenes</p>
                  <p class="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Soporta múltiples archivos JPG, PNG</p>
                </div>
                <input ref="fileInput" type="file" multiple @change="handleFileChange" class="hidden" accept="image/*" />
              </div>
              
              <div v-if="selectedFiles.length > 0" class="flex flex-wrap gap-2">
                <span v-for="(file, idx) in selectedFiles" :key="idx" class="bg-amber-100 text-amber-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {{ file.name }}
                </span>
              </div>
            </div>
          </div>

          <div class="pt-6 flex gap-4">
            <button type="button" @click="isModalOpen = false" class="grow bg-slate-100 text-slate-600 rounded-2xl py-4 font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all">
              Cancelar
            </button>
            <button type="submit" :disabled="isLoading" class="grow bg-slate-950 text-white rounded-2xl py-4 font-black uppercase tracking-widest text-xs hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              <Loader2 v-if="isLoading" class="animate-spin" :size="16" />
              {{ isEditing ? 'Guardar Cambios' : 'Crear Producto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
