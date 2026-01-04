<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockProducts } from '../mocks/products'
import Breadcrumbs from '../components/common/Breadcrumbs.vue'
import ProductGallery from '../components/product/ProductGallery.vue'
import ProductInfo from '../components/product/ProductInfo.vue'
import CardProduct from '../components/product/CardProduct.vue'

const props = defineProps({
    id: {
        type: [String, Number],
        required: true
    }
})

const product = computed(() => {
    return mockProducts.find(p => p.id === parseInt(props.id))
})

// Related products (same category, different id)
const relatedProducts = computed(() => {
    return mockProducts
        .filter(p => p.category === product.value?.category && p.id !== product.value?.id)
        .slice(0, 4)
})

const productImages = computed(() => {
    // For demo, if product only has one image, we'll repeat it or use placeholders
    return [
        product.value?.image,
        'https://images.unsplash.com/photo-1550985616-10810253b84d?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1549536830-67215fc46cf7?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop'
    ]
})
</script>

<template>
    <div v-if="product" class="bg-white min-h-screen pb-20">
        <Breadcrumbs />

        <main class="max-w-7xl mx-auto px-6 py-12 md:py-20">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
                <!-- Gallery Section -->
                <ProductGallery :images="productImages" />

                <!-- Info Section -->
                <ProductInfo :product="product" />
            </div>

            <!-- Related Products Section -->
            <section class="mt-32">
                <div class="flex items-center justify-between mb-12 border-b border-slate-100 pb-8">
                    <h2 class="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">
                        También te puede <span class="text-amber-500">interesar</span>
                    </h2>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <CardProduct v-for="relProduct in relatedProducts" :key="relProduct.id" :product="relProduct" />
                </div>
            </section>
        </main>
    </div>

    <!-- Error State -->
    <div v-else class="min-h-screen flex items-center justify-center bg-slate-50">
        <div class="text-center space-y-6 p-12 bg-white rounded-3xl shadow-2xl border border-slate-100">
            <h2 class="text-3xl font-black text-slate-950 uppercase italic">Producto no encontrado</h2>
            <router-link to="/" class="btn bg-slate-950 text-white rounded-2xl px-10 border-none hover:bg-amber-500 hover:text-slate-950 transition-all">
                Volver a la tienda
            </router-link>
        </div>
    </div>
</template>
