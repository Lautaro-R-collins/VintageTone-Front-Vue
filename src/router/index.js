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
        component: () => import('../views/Checkout.vue')
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: () => import('../views/Favorites.vue')
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

export default router
