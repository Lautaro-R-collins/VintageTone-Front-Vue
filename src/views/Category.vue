<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { mockProducts } from '../mocks/products'
import CategoryHeader from '../components/category/CategoryHeader.vue'
import CardProduct from '../components/product/CardProduct.vue'
import Breadcrumbs from '../components/common/Breadcrumbs.vue'

const route = useRoute()

// State
const currentPage = ref(1)
const itemsPerPage = 6

// Mappings for pretty titles and background images
const categoryInfo = {
    'instrumentos': {
        title: 'Instrumentos',
        subtitle: 'Tesoros con historia',
        image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?q=80&w=2000&auto=format&fit=crop',
        subcategories: {
            'guitarras-electricas': {
                title: 'Guitarras Eléctricas',
                subtitle: 'El alma del rock',
                image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?q=80&w=2000&auto=format&fit=crop'
            },
            'bajos': {
                title: 'Bajos',
                subtitle: 'El groove vintage',
                image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?q=80&w=2000&auto=format&fit=crop'
            },
            'acusticos': {
                title: 'Acústicos',
                subtitle: 'Resonancia natural',
                image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2000&auto=format&fit=crop'
            }
        }
    },
    'amplificadores': {
        title: 'Amplificadores',
        subtitle: 'El tono del pasado',
        image: 'https://images.unsplash.com/photo-1598124838183-9978f24f5ec0?q=80&w=2000&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1549536830-67215fc46cf7?q=80&w=2000&auto=format&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop'
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
    
    // If there's a subcategory, use its info
    if (subSlug && category.subcategories && category.subcategories[subSlug]) {
        return category.subcategories[subSlug]
    }
    
    return category
})

const filteredProducts = computed(() => {
    let products = mockProducts

    // Filter by main category
    if (categorySlug.value) {
        // Map slug to category name in mock data
        const catMap = {
            'instrumentos': 'Instrumentos',
            'amplificadores': 'Amplificadores',
            'efectos': 'Pedales', // Mock data uses "Pedales" instead of "Efectos"
            'accesorios': 'Accesorios'
        }
        const targetCat = catMap[categorySlug.value.toLowerCase()] || categorySlug.value
        products = products.filter(p => p.category.toLowerCase() === targetCat.toLowerCase())
    }

    // Filter by subcategory if exists (logic can be expanded when data supports it)
    if (subcategorySlug.value) {
        // Placeholder for subcategory filter
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

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        window.scrollTo({ top: 400, behavior: 'smooth' })
    }
}

// Reset page when category changes
watch([categorySlug, subcategorySlug], () => {
    currentPage.value = 1
})
</script>

<template>
    <div class="bg-slate-50 min-h-screen pb-20">
        <CategoryHeader 
            :title="currentCategory.title"
            :subtitle="subcategorySlug ? subcategorySlug.replace(/-/g, ' ') : currentCategory.subtitle"
            :image="currentCategory.image"
        />

        <Breadcrumbs />

        <div class="max-w-7xl mx-auto px-6 mt-12">
            <!-- Results Info -->
            <div class="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-slate-200 pb-6">
                <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    Mostrando {{ paginatedProducts.length }} de {{ filteredProducts.length }} productos
                </p>
                
                <div v-if="totalPages > 1" class="join mt-4 md:mt-0">
                    <button 
                        @click="goToPage(currentPage - 1)" 
                        :disabled="currentPage === 1"
                        class="join-item btn btn-xs bg-white border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white disabled:bg-slate-50"
                    >
                        «
                    </button>
                    <button 
                        v-for="page in totalPages" 
                        :key="page"
                        @click="goToPage(page)"
                        class="join-item btn btn-xs"
                        :class="currentPage === page ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'"
                    >
                        {{ page }}
                    </button>
                    <button 
                        @click="goToPage(currentPage + 1)" 
                        :disabled="currentPage === totalPages"
                        class="join-item btn btn-xs bg-white border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white disabled:bg-slate-50"
                    >
                        »
                    </button>
                </div>
            </div>

            <!-- Products Grid -->
            <div v-if="paginatedProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <CardProduct 
                    v-for="product in paginatedProducts" 
                    :key="product.id" 
                    :product="product"
                />
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <h3 class="text-xl font-bold text-slate-900 uppercase tracking-widest mb-2 italic font-logo">No se encontraron productos</h3>
                <p class="text-slate-500 text-xs uppercase tracking-widest">Intenta con otra categoría o vuelve más pronto</p>
                <router-link to="/" class="btn btn-sm mt-8 bg-slate-900 text-white hover:bg-amber-600 border-none px-8 rounded-full">
                    Volver al inicio
                </router-link>
            </div>

            <!-- Bottom Pagination -->
            <div v-if="totalPages > 1" class="flex justify-center mt-16">
                <div class="join">
                    <button 
                        @click="goToPage(currentPage - 1)" 
                        :disabled="currentPage === 1"
                        class="join-item btn btn-sm bg-white border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white"
                    >
                        Anterior
                    </button>
                    <button 
                        v-for="page in totalPages" 
                        :key="page"
                        @click="goToPage(page)"
                        class="join-item btn btn-sm"
                        :class="currentPage === page ? 'bg-slate-900 border-slate-900 text-white font-bold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'"
                    >
                        {{ page }}
                    </button>
                    <button 
                        @click="goToPage(currentPage + 1)" 
                        :disabled="currentPage === totalPages"
                        class="join-item btn btn-sm bg-white border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
