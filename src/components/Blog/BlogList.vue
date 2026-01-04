<script setup>
import { mockBlogPosts } from '../../mocks/mockBlog'
import BlogCard from './BlogCard.vue'
</script>

<template>
    <div class="max-w-7xl mx-auto px-6 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCard 
                v-for="post in mockBlogPosts" 
                :key="post.id" 
                :post="post" 
            />
        </div>
    </div>
</template>
