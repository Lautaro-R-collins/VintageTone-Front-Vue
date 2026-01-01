<script setup>
import Navbar from './Navbar.vue'
import Footer from './Footer.vue'
import AnnouncementBar from '../common/AnnouncementBar.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-100 selection:text-amber-900">
    <AnnouncementBar />
    <Navbar />
    
    <main class="grow">
      <slot />
    </main>
    
    <Footer />
  </div>
</template>
