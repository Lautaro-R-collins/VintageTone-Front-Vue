<template>
    <router-link to="/" class="flex items-center cursor-pointer no-underline group">
        <!-- Desktop Logo -->
        <img 
            src="/logoDesktop.png" 
            alt="VintageTone" 
            class="hidden sm:block h-14 w-auto"
        />
        <!-- Mobile Logo -->
        <img 
            src="/logoMobile.png" 
            alt="VintageTone" 
            class="block sm:hidden h-10 w-auto"
        />
    </router-link>
</template>

<script setup>
</script>
