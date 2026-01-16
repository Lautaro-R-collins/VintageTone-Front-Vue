<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import CategoryHeader from '../components/category/CategoryHeader.vue'
import CardProduct from '../components/product/CardProduct.vue'
import Breadcrumbs from '../components/common/Breadcrumbs.vue'
import Pagination from '../components/ui/Pagination.vue'

// Images
import headerInstrumentos from '../assets/img/header_instrumentos.png'
import headerGuitarras from '../assets/img/header_guitarras.png'
import headerBajos from '../assets/img/header_bajos.png'
import headerAcusticos from '../assets/img/header_acusticos.png'
import headerAmplificadores from '../assets/img/header_amplificadores.png'
import headerEfectos from '../assets/img/header_efectos.png'


const route = useRoute()
const productStore = useProductStore()

// State
const currentPage = ref(1)
const itemsPerPage = 6

// Mappings for pretty titles and background images
const categoryInfo = {
    'instrumentos': {
        title: 'Instrumentos',
        subtitle: 'Tesoros con historia',
        image: headerInstrumentos,
        subcategories: {
            'guitarras-electricas': {
                title: 'Guitarras Eléctricas',
                subtitle: 'El alma del rock',
                image: headerGuitarras
            },
            'bajos': {
                title: 'Bajos',
                subtitle: 'El groove vintage',
                image: headerBajos
            },
            'acusticos': {
                title: 'Acústicos',
                subtitle: 'Resonancia natural',
                image: headerAcusticos
            }
        }
    },
    'amplificadores': {
        title: 'Amplificadores',
        subtitle: 'El tono del pasado',
        image: headerAmplificadores,
        subcategories: {
            'tubulares': {
                title: 'Tubulares',
                subtitle: 'Válvulas legendarias',
                image: 'https://images.unsplash.com/photo-1558098329-a11cff621064?q=80&w=2000&auto=format&fit=crop'
            },
            'transistores': {
                title: 'Transistores',
                subtitle: 'Solidez analógica',
                image: 'https://images.unsplash.com/photo-1571327073757-71d13c24de30?q=80&w=2000&auto=format&fit=crop'
            }
        }
    },
    'efectos': {
        title: 'Efectos',
        subtitle: 'Texturas sonoras',
        image: headerEfectos,
        subcategories: {
            'overdrive': {
                title: 'Overdrive',
                subtitle: 'Saturación clásica',
                image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop'
            },
            'distorsion': {
                title: 'Distorsión',
                subtitle: 'Potencia brutal',
                image: 'https://images.unsplash.com/photo-1548839140-29a749e14530?q=80&w=2000&auto=format&fit=crop'
            },
            'delay': {
                title: 'Delay',
                subtitle: 'Ecos infinitos',
                image: 'https://images.unsplash.com/photo-1558098329-a11cff621064?q=80&w=2000&auto=format&fit=crop'
            }
        }
    },
    'accesorios': {
        title: 'Accesorios',
        subtitle: 'Detalles esenciales',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2000&auto=format&fit=crop',
        subcategories: {
            'puas': {
                title: 'Púas',
                subtitle: 'La conexión perfecta',
                image: 'https://images.unsplash.com/photo-1613405127277-8a9db7f50c9f?q=80&w=2000&auto=format&fit=crop'
            },
            'correas': {
                title: 'Correas',
                subtitle: 'Estilo y comodidad',
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000&auto=format&fit=crop'
            },
            'soportes': {
                title: 'Soportes',
                subtitle: 'Exhibe tu tesoro',
                image: 'https://images.unsplash.com/photo-1558098329-a11cff621064?q=80&w=2000&auto=format&fit=crop'
            },
            'estuches': {
                title: 'Estuches',
                subtitle: 'Protección premium',
                image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2000&auto=format&fit=crop'
            }
        }
    },
    'outlet': {
        title: 'Outlet',
        subtitle: 'Grandes oportunidades',
        image: 'https://www.gibson.com/cdn/shop/files/HERO_desktop__Gibson-DTCJB20BB-1800x1200.jpg?v=1766508063'
    }
}

// Reactivity
const categorySlug = computed(() => route.params.category)
const subcategorySlug = computed(() => route.params.subcategory)

const currentCategory = computed(() => {
    const catSlug = categorySlug.value?.toLowerCase()
    const subSlug = subcategorySlug.value?.toLowerCase()

    const category = categoryInfo[catSlug]

    if (!category) {
        return { title: catSlug || 'Categoría', subtitle: '', image: '' }
    }

    if (subSlug && category.subcategories && category.subcategories[subSlug]) {
        return category.subcategories[subSlug]
    }

    return category
})

const fetchProducts = () => {
    const slugToName = (slug) => {
        if (!slug) return null
        const mapping = {
            'instrumentos': 'Instrumentos',
            'amplificadores': 'Amplificadores',
            'efectos': 'Efectos',
            'accesorios': 'Accesorios',
            'outlet': 'Outlet',
            'guitarras-electricas': 'Guitarras Eléctricas',
            'bajos': 'Bajos',
            'acusticos': 'Acústicos',
            'tubulares': 'Tubulares',
            'transistores': 'Transistores',
            'overdrive': 'Overdrive',
            'distorsion': 'Distorsión',
            'delay': 'Delay',
            'puas': 'Púas',
            'correas': 'Correas',
            'soportes': 'Soportes',
            'estuches': 'Estuches'
        }
        return mapping[slug.toLowerCase()] || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }

    const params = {}
    if (categorySlug.value) {
        const catName = slugToName(categorySlug.value)
        if (catName === 'Outlet') {
        } else {
            params.category = catName
        }
    }

    if (subcategorySlug.value && subcategorySlug.value !== categorySlug.value) {
        params.subcategory = slugToName(subcategorySlug.value)
    }

    productStore.fetchProducts(params)
}

onMounted(fetchProducts)

const filteredProducts = computed(() => {
    const products = productStore.products
    if (categorySlug.value?.toLowerCase() === 'outlet') {
        return products.filter(p => p.category === 'Outlet' || (p.discount && p.discount > 0))
    }
    return products
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredProducts.value.slice(start, end)
})

// Reset page when category changes
watch([categorySlug, subcategorySlug], () => {
    currentPage.value = 1
    fetchProducts()
})

// Scroll to top when page changes
watch(currentPage, () => {
    window.scrollTo({ top: 400, behavior: 'smooth' })
})
</script>

<template>
    <div class="bg-slate-50 min-h-screen pb-20">
        <CategoryHeader :title="currentCategory.title"
            :subtitle="subcategorySlug ? subcategorySlug.replace(/-/g, ' ') : currentCategory.subtitle"
            :image="currentCategory.image" />

        <Breadcrumbs />

        <div class="max-w-7xl mx-auto px-6 mt-12">
            <!-- Results Info -->
            <div class="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-200 pb-6">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Mostrando {{ paginatedProducts.length }} de {{ filteredProducts.length }} productos
                </p>
            </div>

            <!-- Products Grid -->
            <div v-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <CardProduct v-for="product in paginatedProducts" :key="product._id || product.id" :product="product" />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <h3 class="text-xl md:text-2xl font-bold text-slate-900 uppercase tracking-widest mb-2">No se
                    encontraron productos</h3>
                <p class="text-slate-500 text-xs uppercase tracking-widest">Intenta con otra categoría o vuelve más
                    pronto</p>
                <router-link to="/"
                    class="btn btn-sm mt-8 bg-slate-900 text-white hover:bg-amber-600 border-none px-8 rounded-full">
                    Volver al inicio
                </router-link>
            </div>

            <!-- Bottom Pagination -->
            <Pagination v-if="totalPages > 1" v-model:currentPage="currentPage" :totalPages="totalPages" />
        </div>
    </div>
</template>
