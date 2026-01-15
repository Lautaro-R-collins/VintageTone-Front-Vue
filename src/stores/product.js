import { defineStore } from 'pinia'
import api from '../services/api'
import { ref } from 'vue'

export const useProductStore = defineStore('products', () => {
    const products = ref([])
    const currentProduct = ref(null)
    const isLoading = ref(false)
    const error = ref(null)

    async function fetchProducts(params = {}) {
        isLoading.value = true
        error.value = null
        try {
            const { data } = await api.get('/products', { params })
            products.value = data
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al cargar productos'
            console.error('Fetch products error:', err)
        } finally {
            isLoading.value = false
        }
    }

    async function fetchProductById(id) {
        isLoading.value = true
        error.value = null
        try {
            const { data } = await api.get(`/products/${id}`)
            currentProduct.value = data
            return data
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al cargar el producto'
            console.error('Fetch product error:', err)
            return null
        } finally {
            isLoading.value = false
        }
    }

    async function addProduct(formData) {
        isLoading.value = true
        error.value = null
        try {
            const { data } = await api.post('/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            await fetchProducts()
            return { success: true, data }
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al añadir producto'
            return { success: false, message: error.value }
        } finally {
            isLoading.value = false
        }
    }

    async function updateProduct(id, formData) {
        isLoading.value = true
        error.value = null
        try {
            const { data } = await api.put(`/products/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            await fetchProducts()
            return { success: true, data }
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al actualizar producto'
            return { success: false, message: error.value }
        } finally {
            isLoading.value = false
        }
    }

    async function deleteProduct(id) {
        isLoading.value = true
        error.value = null
        try {
            await api.delete(`/products/${id}`)
            products.value = products.value.filter(p => p._id !== id)
            return { success: true }
        } catch (err) {
            error.value = err.response?.data?.message || 'Error al eliminar producto'
            return { success: false, message: error.value }
        } finally {
            isLoading.value = false
        }
    }

    return {
        products,
        currentProduct,
        isLoading,
        error,
        fetchProducts,
        fetchProductById,
        addProduct,
        updateProduct,
        deleteProduct
    }
})
