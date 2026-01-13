import { defineStore } from 'pinia'
import api from '../services/api'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const isAuthenticated = ref(false)

    const isLoading = ref(false)

    async function login(credentials) {
        isLoading.value = true
        try {
            const response = await api.post('/auth/login', credentials)
            user.value = response.data.userData
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

    async function checkAuth() {
        try {
            const response = await api.get('/auth/profile')
            user.value = response.data
            isAuthenticated.value = true
            return true
        } catch (error) {
            user.value = null
            isAuthenticated.value = false
            return false
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

            user.value = response.data.userData
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

    async function logout() {
        try {
            await api.post('/auth/logout')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            user.value = null
            isAuthenticated.value = false
        }
    }

    async function uploadAvatar(file) {
        isLoading.value = true
        try {
            const formData = new FormData()
            formData.append('avatar', file)

            const response = await api.put('/auth/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (user.value) {
                user.value.avatar = response.data.avatar
            }

            return { success: true, avatar: response.data.avatar }
        } catch (error) {
            console.error('Upload avatar error:', error)
            return {
                success: false,
                message: error.response?.data?.message || 'Error al subir la imagen'
            }
        } finally {
            isLoading.value = false
        }
    }

    return {
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth,
        uploadAvatar
    }
})
