import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref([])

    // Load from LocalStorage
    const savedFavorites = localStorage.getItem('vintage_favorites')
    if (savedFavorites) {
        favorites.value = JSON.parse(savedFavorites)
    }

    // Persist to LocalStorage
    watch(favorites, (newFavorites) => {
        localStorage.setItem('vintage_favorites', JSON.stringify(newFavorites))
    }, { deep: true })

    // Getters
    const count = computed(() => favorites.value.length)

    const isFavorite = (productId) => {
        return favorites.value.some(p => (p._id || p.id) === productId)
    }

    // Actions
    const toggleFavorite = (product) => {
        const index = favorites.value.findIndex(p => (p._id || p.id) === (product._id || product.id))
        if (index === -1) {
            favorites.value.push(product)
            toast.success('Agregado a favoritos', {
                description: product.name
            })
        } else {
            favorites.value.splice(index, 1)
            toast.info('Eliminado de favoritos', {
                description: product.name
            })
        }
    }

    const clearFavorites = () => {
        favorites.value.splice(0, favorites.value.length)
        localStorage.setItem('vintage_favorites', JSON.stringify([]))

        toast.info('Favoritos eliminados', {
            description: 'Toda tu colección ha sido borrada.'
        })
    }

    return {
        favorites,
        count,
        isFavorite,
        toggleFavorite,
        clearFavorites
    }
})
