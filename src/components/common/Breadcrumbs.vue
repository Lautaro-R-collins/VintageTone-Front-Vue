<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../../stores/product'

const route = useRoute()
const productStore = useProductStore()

const breadcrumbs = computed(() => {
    const pathArray = route.path.split('/').filter((p) => p !== '')
    const crumbs = []
    let currentPath = ''

    pathArray.forEach((path, index) => {
        currentPath += `/${path}`
        
        // Skip 'category' from being displayed
        if (path.toLowerCase() === 'category') return
        
        let name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')

        // If we are in /product/:id, replace :id with product name
        if (pathArray[index - 1] === 'product' && productStore.currentProduct) {
            name = productStore.currentProduct.name
        }
        
        // Specific mapping for common paths
        const mappings = {
            'product': 'Producto',
            'checkout': 'Finalizar Compra',
            'profile': 'Mi Perfil',
            'favorites': 'Favoritos',
            'about': 'Nosotros',
            'contact': 'Contacto',
            'outlet': 'Outlet'
        }

        if (mappings[path.toLowerCase()]) {
            name = mappings[path.toLowerCase()]
        }
        
        crumbs.push({
            name,
            to: currentPath,
            current: false
        })
    })

    if (crumbs.length > 0) {
        crumbs[crumbs.length - 1].current = true
    }

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
