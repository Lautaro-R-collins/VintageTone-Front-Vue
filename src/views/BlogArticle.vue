<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockBlogPosts } from '../mocks/mockBlog'
import Breadcrumbs from '../components/common/Breadcrumbs.vue'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const post = computed(() => {
    return mockBlogPosts.find(p => p.slug === route.params.slug)
})

const goBack = () => {
    router.push('/blog')
}
</script>

<template>
    <div v-if="post" class="bg-white min-h-screen pb-20">
        <!-- Article Hero -->
        <header class="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <img :src="post.image" :alt="post.title" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

            <div class="absolute inset-0 flex flex-col justify-end pb-12">
                <div class="max-w-4xl mx-auto px-6 w-full space-y-6">
                    <span
                        class="bg-amber-500 text-slate-950 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest italic w-fit">
                        {{ post.category }}
                    </span>
                    <h1
                        class="text-3xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-tight drop-shadow-2xl">
                        {{ post.title }}
                    </h1>

                    <!-- Meta -->
                    <div
                        class="flex flex-wrap items-center gap-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-300">
                        <div class="flex items-center gap-2">
                            <Calendar :size="14" class="text-amber-500" />
                            {{ post.date }}
                        </div>
                        <div class="flex items-center gap-2">
                            <User :size="14" class="text-amber-500" />
                            {{ post.author }}
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Article Content -->
        <article class="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
            <div class="bg-white p-8 md:p-16 shadow-2xl border border-slate-50">

                <!-- Rich Text Content -->
                <div class="prose prose-slate max-w-none 
                    prose-h3:text-2xl prose-h3:font-black prose-h3:uppercase prose-h3:italic prose-h3:tracking-tighter prose-h3:text-slate-950
                    prose-p:text-lg prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium"
                    v-html="post.content">
                </div>
                <!-- Back Button & Share -->
                <div class="flex justify-between items-center mb-12 pb-6 border-b border-slate-100">
                    <button @click="goBack"
                        class="flex items-center gap-2 text-[14px] font-black uppercase tracking-widest text-amber-600 cursor-pointer hover:text-amber-500">
                        <ArrowLeft :size="14" class="group-hover:-translate-x-1 transition-transform" />
                        Volver al blog
                    </button>
                    <button class="text-amber-600 cursor-pointer">
                        <Share2 :size="18" />
                    </button>
                </div>

                <!-- Footer of Article -->
                <div class=" border-t border-slate-100 flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div
                            class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <User :size="24" />
                        </div>
                        <div>
                            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Escrito por</p>
                            <p class="font-black text-slate-950 uppercase italic tracking-tighter">{{ post.author }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>

    <!-- 404 for Blog Post not found -->
    <div v-else class="min-h-screen flex items-center justify-center bg-slate-50 text-center px-6">
        <div class="space-y-6">
            <h2 class="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">Artículo no encontrado</h2>
            <p class="text-slate-600">Lo sentimos, el artículo que buscas no existe o ha sido movido.</p>
            <router-link to="/blog" class="inline-flex items-center justify-center
         bg-slate-950 text-white hover:bg-amber-500
         border-none rounded-full
         px-8 py-4
         uppercase italic font-black text-xs tracking-widest
         leading-none">
                Volver al blog
            </router-link>

        </div>
    </div>
</template>

<style scoped>
:deep(h3) {
    margin-top: 2rem;
    margin-bottom: 1rem;
}

:deep(p) {
    margin-bottom: 1.5rem;
}
</style>
