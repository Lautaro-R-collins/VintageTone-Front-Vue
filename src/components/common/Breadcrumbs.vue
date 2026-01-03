<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter((p) => p !== '')
  
  const crumbs = pathArray.map((path, index) => {
    const to = '/' + pathArray.slice(0, index + 1).join('/')
    const name = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')
    
    return {
      name,
      to,
      current: index === pathArray.length - 1
    }
  })

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
      <div class="text-[16px] uppercase tracking-[0.2em] font-bold breadcrumbs">
        <ul>
          <li v-for="crumb in breadcrumbs" :key="crumb.to">
            <router-link 
              v-if="!crumb.current" 
              :to="crumb.to"
              class="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2"
            >
              <Home v-if="crumb.to === '/'" :size="12" />
              {{ crumb.name }}
            </router-link>
            <span v-else class="text-slate-950 flex items-center gap-2">
              <Home v-if="crumb.to === '/'" :size="12" />
              {{ crumb.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breadcrumbs > ul > li + *:before {
  color: var(--color-slate-400, #94a3b8);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
  opacity: 1;
}

/* Override DaisyUI default if needed to match brand colors */
.breadcrumbs ul li span, .breadcrumbs ul li a {
    display: flex;
    align-items: center;
}
</style>
