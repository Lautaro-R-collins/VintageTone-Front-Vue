import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const isDrawerOpen = ref(false)

    // Load from LocalStorage
    const savedCart = localStorage.getItem('vintage_cart')
    if (savedCart) {
        items.value = JSON.parse(savedCart)
    }

    // Persist to LocalStorage
    watch(items, (newItems) => {
        localStorage.setItem('vintage_cart', JSON.stringify(newItems))
    }, { deep: true })

    // Getters
    const totalItems = computed(() => items.value.reduce((acc, item) => acc + item.quantity, 0))

    const totalPrice = computed(() => {
        return items.value.reduce((acc, item) => {
            const price = typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/,/g, ''))
            return acc + (price * item.quantity)
        }, 0)
    })

    // Actions
    const toggleDrawer = () => {
        isDrawerOpen.value = !isDrawerOpen.value
    }

    const addItem = (product, quantity = 1) => {
        const productId = product._id || product.id
        const existingItem = items.value.find(item => (item._id || item.id) === productId)
        const currentQty = existingItem ? existingItem.quantity : 0
        const totalQty = currentQty + quantity
        const stock = product.stock || 0

        if (totalQty > stock) {
            toast.error(`Stock máximo disponible: ${stock} `, {
                description: 'No puedes agregar más unidades de las disponibles.'
            })
            return
        }

        if (existingItem) {
            existingItem.quantity += quantity
        } else {
            // Ensure we have a clean item object with consistent fields
            const itemToAdd = {
                ...product,
                id: productId, // Fallback for components expecting .id
                quantity,
                image: product.images?.[0] || product.image
            }
            items.value.push(itemToAdd)
        }

        toast.success('Producto agregado al carrito', {
            description: `${product.name} x${quantity} `
        })
    }

    const removeItem = (productId) => {
        const item = items.value.find(item => (item._id || item.id) === productId)
        if (item) {
            items.value = items.value.filter(item => (item._id || item.id) !== productId)
            toast.info('Producto eliminado', {
                description: item.name
            })
        }
    }

    const updateQuantity = (productId, quantity) => {
        const item = items.value.find(item => item.id === productId)
        if (item) {
            // Check stock limit for updates too
            if (quantity > item.stock) {
                toast.error(`Stock máximo disponible: ${item.stock} `)
                return
            }
            item.quantity = quantity
        }
    }

    const clearCart = () => {
        items.value = []
        toast.info('Carrito vaciado')
    }

    return {
        items,
        isDrawerOpen,
        totalItems,
        totalPrice,
        toggleDrawer,
        addItem,
        removeItem,
        updateQuantity,
        clearCart
    }
})
