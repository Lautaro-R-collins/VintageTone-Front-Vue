# 🎸 VintageTone - Premium Audio E-commerce

<div align="center">
  <p align="center">
    <img src="https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js" />
    <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Pinia-2.x-yellow?style=for-the-badge&logo=pinia&logoColor=black" alt="Pinia" />
  </p>
  
  **VintageTone** es una plataforma de e-commerce premium dedicada a la venta de equipos de audio vintage, instrumentos musicales y accesorios de alta gama. Diseñada con un enfoque en la experiencia de usuario (UX) y una estética visual sofisticada.
</div>

---

## 🚀 Vista Previa del Proyecto

![Banner del Proyecto](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=VintageTone+Frontend+Showcase)
> [!TIP]
> Puedes ver el sitio en vivo aquí: **[Demo en Vivo](https://vintagetone-front-vue.vercel.app/)** *(Actualiza con tu URL real)*

---

## ✨ Características Principales

### 🛒 Experiencia de Compra Completa
- **Catálogo Dinámico:** Navegación por categorías y subcategorías con filtros reactivos.
- **Búsqueda Avanzada:** Sistema de búsqueda predictiva con resultados en tiempo real.
- **Carrito de Compras:** Gestión completa de productos (añadir, quitar, persistencia).
- **Favoritos:** Lista de deseos personalizada para cada usuario.

### 👤 Gestión de Usuarios y Seguridad
- **Autenticación Robusta:** Registro e inicio de sesión seguro.
- **Perfiles Personalizados:** Gestión de información personal y subida de avatares.
- **Roles y Permisos:** Diferenciación clara entre usuarios regulares y administradores.

### 🛠️ Panel de Administración (Back-Office)
- **Gestión de Inventario:** Interfase para que administradores puedan gestionar productos y stock.
- **Monitoreo de Órdenes:** Visualización y control de pedidos realizados.

### 📱 Diseño y UX
- **Responsive Design:** Totalmente adaptado a móviles, tablets y escritorio.
- **Estética Premium:** Uso de DaisyUI y Tailwind 4 para una interfaz moderna y fluida.
- **Micro-interacciones:** Animaciones suaves en transiciones de página y elementos interactivos.

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **Vue 3 (Composition API)** | Framework principal para la UI reactiva. |
| **Pinia** | Gestión del estado global (Auth, Carrito, Productos). |
| **Vue Router** | Sistema de navegación y guardias de seguridad. |
| **Tailwind CSS 4** | Framework de estilos utilitarios de última generación. |
| **DaisyUI** | Componentes UI premium y consistentes. |
| **Axios** | Cliente HTTP para consumo de API REST. |
| **Lucide Vue** | Set de iconos minimalistas y modernos. |
| **Vue Sonner** | Sistema de notificaciones (Toasts) fluido. |

---

## 📂 Estructura de Carpetas

```bash
src/
├── assets/          # Imágenes, fuentes y estilos globales
├── components/      # Componentes reutilizables organizados por módulos
│   ├── adminPanel/  # Componentes exclusivos de administración
│   ├── cart/        # Lógica y UI del carrito
│   ├── common/      # Componentes transversales (Botones, Inputs)
│   └── ...          # Auth, Blog, Product, Reviews, etc.
├── layouts/         # Envoltorios de estructura (Navbar + Footer)
├── services/        # Configuración de Axios y llamadas a API
├── stores/          # Estados globales de Pinia (auth.js, cart.js, etc.)
├── views/           # Páginas principales de la aplicación
└── router/          # Configuración de rutas y navegación
```

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Lautaro-R-collins/VintageTone-Front-Vue.git
   cd VintageTone-Front-Vue
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz con lo siguiente:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

4. **Correr en modo desarrollo:**
   ```bash
   npm run dev
   ```

---

## 📐 Arquitectura

El proyecto sigue una arquitectura **basada en módulos y servicios**, lo que garantiza escalabilidad y facilidad de mantenimiento:

- **Store-driven Development:** Pinia centraliza la lógica de negocio, permitiendo que los componentes se enfoquen únicamente en la presentación.
- **Service Layer:** Todas las peticiones al backend están encapsuladas en archivos dentro de `src/services`, desacoplando la lógica de red de los componentes.
- **Componentes Atómicos:** Uso de componentes pequeños y reutilizables en `src/components/common`.

---

## 🤝 Contacto

Lautaro Collins - [Tu LinkedIn](https://linkedin.com/in/tu-usuario) - [Tu Portfolio](https://tu-portfolio.com)

Proyecto creado para mi Portfolio Profesional.
