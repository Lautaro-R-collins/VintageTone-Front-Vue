import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
    {
        path: '/category/:category',
        name: 'Category',
        component: () => import('../views/Category.vue')
    },
    {
        path: '/category/:category/:subcategory',
        name: 'Subcategory',
        component: () => import('../views/Category.vue')
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('../views/Blog.vue')
    },
    {
        path: '/blog/:slug',
        name: 'BlogArticle',
        component: () => import('../views/BlogArticle.vue'),
        props: true
    },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: () => import('../views/DetailProduct.vue'),
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../views/Checkout.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: () => import('../views/Favorites.vue')
    },
    {
        path: '/Orders',
        name: 'Orders',
        component: () => import('../views/Orders.vue'),
        meta: { requiresAuth: true, onlyFromProfile: true }
    },
    {
        path: '/admin',
        name: 'AdminPanel',
        component: () => import('../views/AdminPanel.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/Profile.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/search',
        name: 'SearchResults',
        component: () => import('../views/SearchResultsPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { top: 0 }
    }
})

// Navigation Guards
import { useAuthStore } from '../stores/auth'

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (to.meta.requiresAdmin && !authStore.user?.isAdmin) {
        // Strict admin protection
        next('/profile')
    } else if ((to.name === 'Login' || to.name === 'Register') && authStore.isAuthenticated) {
        next('/profile')
    } else if (to.meta.onlyFromProfile && from.name !== 'Profile') {
        // Strict access: Only allow entering Orders from Profile
        next('/profile')
    } else {
        next()
    }
})

export default router
