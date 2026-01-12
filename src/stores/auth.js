import { defineStore } from 'pinia'
import api from '../services/api'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('auth_user')) || null)
    const isAuthenticated = ref(!!localStorage.getItem('auth_user'))

    const isLoading = ref(false)

    async function login(credentials) {
        isLoading.value = true
        try {
            const response = await api.post('/auth/login', credentials)
            const { user: userData } = response.data

            if (userData) {
                user.value = userData
                localStorage.setItem('auth_user', JSON.stringify(userData))
            }

            isAuthenticated.value = true
            return { success: true }
        } catch (error) {
            console.error('Login error:', error)
            return {
                success: false,
                message: error.response?.data?.message || 'Error al iniciar sesión'
            }
        } finally {
            isLoading.value = false
        }
    }

    async function register(userData) {
        isLoading.value = true
        try {
            const response = await api.post('/auth/register', {
                userName: userData.userName,
                email: userData.email,
                password: userData.password
            })

            isAuthenticated.value = true

            return { success: true }
        } catch (error) {
            console.error('Registration error:', error)
            return {
                success: false,
                message: error.response?.data?.message || 'Error al registrarse'
            }
        } finally {
            isLoading.value = false
        }
    }

    function logout() {
        api.post('/auth/logout').finally(() => {
            user.value = null
            isAuthenticated.value = false
            localStorage.removeItem('auth_user')
        })
    }

    return {
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout
    }
})
