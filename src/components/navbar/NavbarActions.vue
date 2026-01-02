<template>
    <div class="flex items-center space-x-4 sm:space-x-6">
        <button class="text-slate-400 hover:text-slate-950 transition-colors flex items-center justify-center">
            <Search :size="20" :stroke-width="2.5" />
        </button>
        <AuthButton />
    </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next'
import AuthButton from './AuthButton.vue'
</script>
