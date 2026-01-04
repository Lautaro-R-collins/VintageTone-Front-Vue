<script setup>
import { ref, computed } from 'vue'
import HeaderHome from '../components/home/HeaderHome.vue'
import SliderBanner from '../components/home/SliderBanner.vue'
import CategoryHome from '../components/home/CategoryHome.vue'
import InfoCardsHome from '../components/home/InfoCardsHome.vue'
import HomeOfert from '../components/home/HomeOfert.vue'
import CardProduct from '../components/product/CardProduct.vue'
import BackBanner from '../components/home/BackBanner.vue'
import Pagination from '../components/ui/Pagination.vue'
import { mockProducts } from '../mocks/products'
import { ArrowRight, Star, Heart } from 'lucide-vue-next'

const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => Math.ceil(mockProducts.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return mockProducts.slice(start, end)
})
</script>

<template>
  <div>
    <HeaderHome />
    <SliderBanner />
    <CategoryHome />
    <InfoCardsHome />
    <HomeOfert />

    <div class="max-w-7xl mx-auto px-6 pb-20">
      <h2 class="text-3xl font-black text-slate-900 uppercase italic tracking-tighter mb-12">
        Nuestra Colección
      </h2>

      <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <CardProduct v-for="product in paginatedProducts" :key="product.id" :product="product" />
      </section>

      <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
    </div>

    <BackBanner />
  </div>
</template>
