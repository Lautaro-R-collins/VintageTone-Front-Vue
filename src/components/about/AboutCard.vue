<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isReversed: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <section 
        class="flex flex-col gap-12 items-center py-16"
        :class="[isReversed ? 'md:flex-row-reverse' : 'md:flex-row']"
    >
        <!-- Text Content -->
        <div class="flex-1 space-y-6">
            <h2 class="text-3xl md:text-5xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
                {{ title }}
            </h2>
            <p class="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                {{ text }}
            </p>
        </div>

        <!-- Image Content -->
        <div class="flex-1 w-full h-[300px] md:h-[450px] overflow-hidden rounded-2xl shadow-2xl group">
            <img 
                :src="image" 
                :alt="title" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </div>
    </section>
</template>
