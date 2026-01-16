import { defineStore } from 'pinia'
import api from '../services/api'
import { ref } from 'vue'

export const useReviewStore = defineStore('review', () => {
    const reviews = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    async function fetchReviews(productId) {
        isLoading.value = true
        error.value = null
        reviews.value = [] // Clear old reviews
        try {
            const response = await api.get(`/reviews/${productId}`)
            reviews.value = response.data
        } catch (err) {
            console.error('Error fetching reviews:', err)
            error.value = err.response?.data?.message || 'Error al cargar las reseñas'
        } finally {
            isLoading.value = false
        }
    }

    async function addReview(productId, reviewData) {
        isLoading.value = true
        error.value = null
        try {
            const response = await api.post(`/reviews/${productId}`, reviewData)
            // Add the new review to the list
            reviews.value.unshift(response.data.review || response.data)
            return { success: true }
        } catch (err) {
            console.error('Error adding review:', err)
            const message = err.response?.data?.message || 'Error al publicar la reseña'
            error.value = message
            return { success: false, message }
        } finally {
            isLoading.value = false
        }
    }

    return {
        reviews,
        isLoading,
        error,
        fetchReviews,
        addReview
    }
})
