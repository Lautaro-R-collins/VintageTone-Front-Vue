<script setup>
import { ArrowRight, Calendar, User } from 'lucide-vue-next'

defineProps({
    post: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <router-link :to="'/blog/' + post.slug" 
        class="group bg-white flex flex-col h-full overflow-hidden border border-amber-500/20 transition-all duration-500 shadow-2xl">
        
        <!-- Image Container -->
        <div class="relative h-64 overflow-hidden">
            <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute top-4 left-4">
                <span class="bg-amber-500 text-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-widest italic">
                    {{ post.category }}
                </span>
            </div>
        </div>

        <!-- Content -->
        <div class="p-8 flex flex-col grow space-y-4">
            <!-- Meta -->
            <div class="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <div class="flex items-center gap-1.5">
                    <Calendar :size="12" />
                    {{ post.date }}
                </div>
                <div class="flex items-center gap-1.5">
                    <User :size="12" />
                    {{ post.author }}
                </div>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-black text-slate-950 uppercase italic tracking-tighter leading-tight group-hover:text-amber-600 transition-colors">
                {{ post.title }}
            </h3>

            <!-- Summary -->
            <p class="text-sm flex text-slate-600 font-medium leading-relaxed grow">
                {{ post.summary }}
            </p>

            <!-- Read More -->
            <div class="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 group-hover:translate-x-2 transition-transform">
                Leer artículo 
                <ArrowRight :size="14" class="text-amber-500" />
            </div>
        </div>
    </router-link>
</template>
