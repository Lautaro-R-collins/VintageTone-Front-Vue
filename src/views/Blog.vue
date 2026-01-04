<script setup>
import BlogHeader from '../components/Blog/BlogHeader.vue'
import BlogList from '../components/Blog/BlogList.vue'
import Breadcrumbs from '../components/common/Breadcrumbs.vue'
</script>

<template>
    <div class="bg-slate-50 min-h-screen">  
        <BlogHeader />
        <Breadcrumbs />
        <main>
            <BlogList />
        </main>
    </div>
</template>
