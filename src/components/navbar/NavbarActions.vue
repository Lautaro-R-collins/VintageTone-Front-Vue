<template>
    <div class="flex items-center space-x-4 sm:space-x-6">
        <button class="text-slate-400 hover:text-slate-950 transition-colors flex items-center justify-center">
            <Search :size="20" :stroke-width="2.5" />
        </button>
        <button
            class="btn btn-ghost btn-sm text-slate-950 hover:bg-slate-50 border border-slate-200 rounded-none px-4 sm:px-6 font-bold uppercase italic tracking-widest text-[10px] flex items-center gap-2">
            <User :size="14" :stroke-width="3" />
            <span class="hidden xs:inline">Mi Cuenta</span>
        </button>
    </div>
</template>

<script setup>
import { Search, User } from 'lucide-vue-next'
</script>
