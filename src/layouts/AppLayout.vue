<script setup>
import Navbar from '../components/navbar/Navbar.vue'
import Footer from '../components/footer/Footer.vue'
import AnnouncementBar from '../components/common/AnnouncementBar.vue'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-100 selection:text-amber-900">
    <Toaster position="top-right" richColors />
    <AnnouncementBar />
    <Navbar />
    
    <main class="grow">
      <slot />
    </main>
    
    <div class="border-t border-slate-200"></div>
    <Footer />
  </div>
</template>
