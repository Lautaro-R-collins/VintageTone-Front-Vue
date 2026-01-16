<script setup>
defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    totalPages: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['update:currentPage'])

const setPage = (page) => {
    if (page >= 1 && page <= totalPages) {
        emit('update:currentPage', page)
    }
}
</script>

<template>
    <div class="flex justify-center mt-12 mb-20">
        <div class="flex items-center gap-2">
            <button
                class="btn btn-sm md:btn-md bg-slate-900 hover:bg-slate-950 text-white border-none rounded-lg transition-all duration-300 disabled:opacity-30 cursor-pointer"
                :disabled="currentPage === 1" @click="emit('update:currentPage', currentPage - 1)">
                «
            </button>

            <button v-for="page in totalPages" :key="page"
                class="btn btn-sm md:btn-md border-none rounded-lg transition-all duration-300 font-bold cursor-pointer"
                :class="[
                    currentPage === page
                        ? 'bg-amber-500 text-white shadow-lg'
                        : 'bg-slate-900 hover:bg-slate-950 text-white'
                ]" @click="emit('update:currentPage', page)">
                {{ page }}
            </button>

            <button
                class="btn btn-sm md:btn-md bg-slate-900 hover:bg-slate-950 text-white border-none rounded-lg transition-all duration-300 disabled:opacity-30 cursor-pointer"
                :disabled="currentPage === totalPages" @click="emit('update:currentPage', currentPage + 1)">
                »
            </button>
        </div>
    </div>
</template>
