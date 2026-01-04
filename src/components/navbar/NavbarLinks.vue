<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const emit = defineEmits(['link-clicked'])

const navbarRef = ref(null)
const activeCategory = ref(null)

const toggleCategory = (name) => {
    if (activeCategory.value === name) {
        activeCategory.value = null
    } else {
        activeCategory.value = name
    }
}

const closeAll = () => {
    activeCategory.value = null
    emit('link-clicked')
}

const handleClickOutside = (event) => {
    if (navbarRef.value && !navbarRef.value.contains(event.target)) {
        activeCategory.value = null
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

const navLinks = [
    { name: 'Inicio', path: '/' },
    {
        name: 'Instrumentos',
        path: '/category/instrumentos',
        subcategories: [
            { name: 'Todos', path: '/category/instrumentos' },
            { name: 'Guitarras Eléctricas', path: '/category/instrumentos/guitarras-electricas' },
            { name: 'Bajos', path: '/category/instrumentos/bajos' },
            { name: 'Acústicos', path: '/category/instrumentos/acusticos' }
        ]
    },
    {
        name: 'Amplificadores',
        path: '/category/amplificadores',
        subcategories: [
            { name: 'Todos', path: '/category/amplificadores' },
            { name: 'Tubulares', path: '/category/amplificadores/tubulares' },
            { name: 'Transistores', path: '/category/amplificadores/transistores' }
        ]
    },
    {
        name: 'Efectos',
        path: '/category/efectos',
        subcategories: [
            { name: 'Todos', path: '/category/efectos' },
            { name: 'Overdrive', path: '/category/efectos/overdrive' },
            { name: 'Distorsión', path: '/category/efectos/distorsion' },
            { name: 'Delay', path: '/category/efectos/delay' }
        ]
    },
    {
        name: 'Accesorios',
        path: '/category/accesorios',
        subcategories: [
            { name: 'Todos', path: '/category/accesorios' },
            { name: 'Púas', path: '/category/accesorios/puas' },
            { name: 'Correas', path: '/category/accesorios/correas' },
            { name: 'Soportes', path: '/category/accesorios/soportes' },
            { name: 'Estuches', path: '/category/accesorios/estuches' }
        ]
    },
    { name: 'Outlet', path: '/category/outlet' }
]

const infoLinks = [
    { name: 'Nosotros', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contact' }

]
</script>


<template>
    <div class="flex flex-col lg:flex-row items-center justify-between w-full text-[11px] font-bold uppercase tracking-[0.2em] text-white py-4 lg:py-0 px-6 md:px-0"
        ref="navbarRef">

        <!-- Left Group: Categories -->
        <div class="flex flex-col lg:flex-row items-center w-full lg:w-auto">
            <template v-for="link in navLinks" :key="link.name">
                <!-- Dropdown for categories with subcategories -->
                <details v-if="link.subcategories" class="w-full lg:w-auto lg:dropdown group"
                    :open="activeCategory === link.name">
                    <summary @click.prevent="toggleCategory(link.name)"
                        class="flex items-center justify-center w-full lg:w-auto text-center px-4 py-3 lg:py-2.5 hover:bg-white/10 transition-all cursor-pointer list-none select-none">
                        {{ link.name }}
                        <ChevronDown class="w-4 h-4 transition-transform duration-300"
                            :class="{ 'rotate-180': activeCategory === link.name }" />
                    </summary>
                    <ul
                        class="lg:dropdown-content menu bg-slate-950 lg:bg-slate-950 lg:border  z-10 w-[90%] mx-auto lg:w-52 p-2 lg:shadow-2xl border-none mt-0 lg:absolute static">
                        <li v-for="sub in link.subcategories" :key="sub.name">
                            <router-link :to="sub.path" @click="closeAll"
                                class="hover:bg-white/10 py-3 lg:py-2 px-6 lg:px-4 transition-colors normal-case text-[10px] lg:text-[11px]">
                                {{ sub.name }}
                            </router-link>
                        </li>
                    </ul>
                </details>

                <!-- Simple link -->
                <router-link v-else @click="closeAll" :to="link.path"
                    class="w-full lg:w-auto text-center px-4 py-3 lg:py-2.5 hover:bg-white/10 transition-all cursor-pointer"
                    :class="link.color">
                    {{ link.name }}
                </router-link>
            </template>
        </div>

        <!-- Right Group: Information -->
        <div
            class="flex flex-col lg:flex-row items-center w-full lg:w-auto border-t border-white/5 lg:border-none mt-2 lg:mt-0 pt-2 lg:pt-0">
            <router-link v-for="link in infoLinks" :key="link.name" @click="closeAll" :to="link.path"
                class="w-full lg:w-auto text-center px-4 py-3 lg:py-2.5 hover:bg-white/10 transition-all cursor-pointer">
                {{ link.name }}
            </router-link>
        </div>
    </div>
</template>
