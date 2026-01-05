<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockProducts } from '../../mocks/products'

const route = useRoute()

const breadcrumbs = computed(() => {
    const pathArray = route.path.split('/').filter((p) => p !== '')
    
    const crumbs = []
    let currentPath = ''

    pathArray.forEach((path) => {
        currentPath += `/${path}`
        
        // Skip 'category' from being displayed
        if (path.toLowerCase() === 'category') return
        
        // Check if path is an ID (numeric)
        const isId = !isNaN(path) && !isNaN(parseFloat(path))
        let name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')

        if (isId) {
            const product = mockProducts.find(p => p.id === parseInt(path))
            if (product) {
                name = product.name
            }
        }
        
        crumbs.push({
            name,
            to: currentPath,
            current: false // Will be updated in logic if needed, but easier to check against full path or index in original
        })
    })

    // Correctly set current for the last item displayed
    if (crumbs.length > 0) {
        crumbs[crumbs.length - 1].current = true
    }

    // Add Home to the beginning
    return [
        { name: 'Inicio', to: '/', current: route.path === '/' },
        ...crumbs
    ]
})

const isHome = computed(() => route.path === '/')
</script>

<template>
    <div v-if="!isHome" class="bg-white border-b border-slate-100">
        <div class="max-w-7xl mx-auto px-6 py-3">
            <div class="text-[9px] md:text-[20px]  uppercase tracking-[0.2em] font-bold breadcrumbs">
                <ul>
                    <li v-for="crumb in breadcrumbs" :key="crumb.to">
                        <router-link v-if="!crumb.current" :to="crumb.to"
                            class="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2">
                            {{ crumb.name }}
                        </router-link>
                        <span v-else class="text-slate-950 flex items-center gap-2">
                            {{ crumb.name }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.breadcrumbs>ul>li+*:before {
    color: var(--color-slate-400, #94a3b8);
    margin-left: 0.5rem;
    margin-right: 0.75rem;
    opacity: 1;
}

.breadcrumbs ul li span,
.breadcrumbs ul li a {
    display: flex;
    align-items: center;
}
</style>
