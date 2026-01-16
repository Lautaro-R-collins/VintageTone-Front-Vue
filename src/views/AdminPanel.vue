<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '../stores/product'
import { toast } from 'vue-sonner'
import { Package, TrendingUp, Users, PackageCheck } from 'lucide-vue-next'

// Components
import HeaderPanelAdmin from '../components/adminPanel/HeaderPanelAdmin.vue'
import AdminStats from '../components/adminPanel/AdminStats.vue'
import ProductTable from '../components/adminPanel/ProductTable.vue'
import AdminPanelForm from '../components/adminPanel/AdminPanelForm.vue'

const router = useRouter()
const productStore = useProductStore()

// State
const isModalOpen = ref(false)
const isEditing = ref(false)
const isLoading = ref(false)
const currentProductId = ref(null)
const searchQuery = ref('')
const selectedFiles = ref([])

const form = ref({
  name: '',
  description: '',
  price: 0,
  category: '',
  subcategory: '',
  stock: 0,
  brand: 'Genérico',
  discount: 0
})

onMounted(() => {
  productStore.fetchProducts()
})

const stats = computed(() => [
  { label: 'Productos Totales', value: productStore.products.length.toString(), icon: Package, color: 'bg-blue-500' },
  { label: 'Ventas del Mes', value: '$45.2k', icon: TrendingUp, color: 'bg-green-500' },
  { label: 'Usuarios Activos', value: '1,205', icon: Users, color: 'bg-purple-500' },
  { label: 'Stock Bajo', value: productStore.products.filter(p => p.stock < 5).length.toString(), icon: PackageCheck, color: 'bg-amber-500' },
])

const filteredProducts = computed(() => {
  if (!searchQuery.value) return productStore.products
  const query = searchQuery.value.toLowerCase()
  return productStore.products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query) ||
    p.subcategory?.toLowerCase().includes(query)
  )
})

const openModal = (product = null) => {
  if (product) {
    isEditing.value = true
    currentProductId.value = product._id
    form.value = {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      subcategory: product.subcategory || '',
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
      subcategory: '',
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
  
  Object.keys(form.value).forEach(key => {
    if (key === 'subcategory' && !form.value[key]) return
    formData.append(key, form.value[key])
  })

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
      <HeaderPanelAdmin 
        v-model:searchQuery="searchQuery"
        @go-back="goBack"
        @open-modal="openModal()"
      />

      <AdminStats :stats="stats" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <ProductTable 
            :products="filteredProducts"
            @edit-product="openModal"
            @delete-product="deleteProduct"
          />
        </div>
      </div>
    </div>

    <AdminPanelForm 
      v-if="isModalOpen"
      v-model:form="form"
      :is-editing="isEditing"
      :is-loading="isLoading"
      :selected-files="selectedFiles"
      @close="isModalOpen = false"
      @submit="handleSubmit"
      @handle-file-change="handleFileChange"
    />
  </div>
</template>
