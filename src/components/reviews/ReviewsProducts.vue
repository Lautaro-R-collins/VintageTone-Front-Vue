<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useReviewStore } from '../../stores/review'
import { Star, MessageSquare, Send, Calendar } from 'lucide-vue-next'

const props = defineProps({
    productId: {
        type: String,
        required: true
    }
})

const authStore = useAuthStore()
const reviewStore = useReviewStore()

const rating = ref(5)
const comment = ref('')
const isSubmitting = ref(false)
const submissionError = ref('')
const submissionSuccess = ref(false)

const reviews = computed(() => reviewStore.reviews)
const isLoading = computed(() => reviewStore.isLoading)
const isAuthenticated = computed(() => authStore.isAuthenticated)

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}

const submitReview = async () => {
    if (!comment.value.trim()) {
        submissionError.value = 'Por favor, escribe un comentario.'
        return
    }

    isSubmitting.value = true
    submissionError.value = ''
    submissionSuccess.value = false

    const result = await reviewStore.addReview(props.productId, {
        rating: rating.value,
        comment: comment.value
    })

    if (result.success) {
        submissionSuccess.value = true
        comment.value = ''
        rating.value = 5
        await reviewStore.fetchReviews(props.productId)
    } else {
        submissionError.value = result.message || 'Error al publicar la reseña.'
    }
    isSubmitting.value = false
}

// Watch for product changes to fetch new reviews
watch(() => props.productId, (newId) => {
    if (newId) {
        submissionSuccess.value = false
        submissionError.value = ''
        comment.value = ''
        rating.value = 5
        reviewStore.fetchReviews(newId)
    }
}, { immediate: true })

onMounted(() => {
    // Already handled by immediate: true in watch
})
</script>

<template>
    <section class="mt-20 border-t border-slate-100 pt-20">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            <!-- Sidebar: Stats & Form -->
            <div class="space-y-12">
                <div class="space-y-4">
                    <h2 class="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">
                        Reseñas del <span class="text-amber-500">Producto</span>
                    </h2>
                </div>

                <!-- Review Form -->
                <div v-if="isAuthenticated" class="bg-slate-50 rounded-3xl border border-slate-100 space-y-6">
                    <div class="space-y-4">
                        <!-- Rating Stars (DaisyUI) -->
                        <div class="flex flex-col gap-2">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Puntuación</label>
                            <div class="rating rating-lg">
                                <input v-for="n in 5" :key="n" 
                                    type="radio" 
                                    :name="'rating-' + productId" 
                                    class="mask mask-star-2 bg-amber-400" 
                                    :value="n"
                                    v-model="rating"
                                    :aria-label="n + ' star'"
                                />
                            </div>
                        </div>

                        <!-- Comment Textarea -->
                        <div class="flex flex-col gap-2">
                            <label class="text-[10px] font-black uppercase tracking-widest text-slate-400">Tu Comentario</label>
                            <textarea 
                                v-model="comment"
                                placeholder="¿Qué te pareció este producto? Sonido, construcción, estética..."
                                class="textarea textarea-bordered w-full bg-white border-slate-200 rounded-2xl h-32 focus:border-amber-500 focus:outline-none placeholder:text-slate-300 font-medium text-slate-700"
                            ></textarea>
                        </div>

                        <!-- Submission Status -->
                        <div v-if="submissionError" class="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100">
                            {{ submissionError }}
                        </div>
                        <div v-if="submissionSuccess" class="text-emerald-600 text-xs font-bold bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                            ¡Gracias! Tu reseña se ha publicado correctamente.
                        </div>

                        <!-- Submit Button -->
                        <button 
                            @click="submitReview"
                            :disabled="isSubmitting"
                            class="w-full bg-slate-900 text-white rounded-2xl py-4 font-black uppercase italic tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-amber-500 hover:text-slate-950 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                        >
                            <Send v-if="!isSubmitting" :size="16" />
                            <span v-if="isSubmitting" class="loading loading-spinner loading-xs"></span>
                            {{ isSubmitting ? 'Publicando...' : 'Publicar Reseña' }}
                        </button>
                    </div>
                </div>

                <!-- Not Logged In Call to Action -->
                <div v-else class="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-6 text-center">
                    <div class="space-y-2">
                        <h3 class="text-white font-black uppercase italic tracking-wider">Únete a la conversación</h3>
                        <p class="text-slate-400 text-sm font-medium">
                            Solo los usuarios registrados pueden dejar reseñas de productos.
                        </p>
                    </div>
                    <router-link to="/login" class="btn bg-amber-500 hover:bg-amber-600 text-slate-950 border-none rounded-2xl w-full font-black uppercase italic tracking-widest text-xs">
                        Inicia Sesión
                    </router-link>
                </div>
            </div>

            <!-- Main: Reviews List -->
            <div class="lg:col-span-2 space-y-8">
                <div v-if="isLoading && reviews.length === 0" class="flex flex-col items-center justify-center py-20 space-y-4">
                    <span class="loading loading-ring loading-lg text-amber-500"></span>
                    <p class="text-slate-400 font-bold uppercase italic tracking-widest text-xs">Cargando reseñas...</p>
                </div>

                <div v-else-if="reviews.length === 0" class="bg-slate-50 rounded-[40px] p-20 text-center border-2 border-dashed border-slate-200">
                    <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <MessageSquare class="text-slate-300" :size="32" />
                    </div>
                    <h3 class="text-xl font-black text-slate-900 uppercase italic mb-2">Sé el primero en opinar</h3>
                    <p class="text-slate-500 font-medium">Este producto aún no tiene reseñas. ¡Danos tu opinión!</p>
                </div>

                <div v-else class="space-y-6">
                    <div v-for="review in reviews" :key="review._id" class="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-md transition-shadow group">
                        <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
                            <div class="flex items-center gap-4">
                                <!-- Avatar Placeholder -->
                                <div class="w-12 h-12 bg-slate-950 text-amber-500 rounded-2xl flex items-center justify-center font-black text-xl italic uppercase shadow-lg">
                                    {{ review.username ? review.username.charAt(0) : 'U' }}
                                </div>
                                <div>
                                    <h4 class="font-black text-slate-900 uppercase italic tracking-tight">{{ review.username }}</h4>
                                    <div class="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                        <Calendar :size="10" />
                                        {{ formatDate(review.createdAt) }}
                                    </div>
                                </div>
                            </div>

                            <!-- Rating Stars (Static Display) -->
                            <div class="flex items-center gap-1">
                                <Star v-for="i in 5" :key="i"
                                    :size="18"
                                    :class="i <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'"
                                />
                            </div>
                        </div>

                        <div class="mt-6">
                            <p class="text-slate-600 font-medium leading-relaxed italic">
                                "{{ review.comment }}"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.mask-star-2 {
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
</style>
