#  VintageTone - Audio E-commerce

<div align="center">
  <p align="center">
    <img src="https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js" />
    <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Pinia-2.x-yellow?style=for-the-badge&logo=pinia&logoColor=black" alt="Pinia" />
  </p>
  
  **VintageTone** es una plataforma de e-commerce dedicada a la venta de equipos de audio vintage, instrumentos musicales y accesorios de alta gama. Diseñada con un enfoque en la experiencia de usuario (UX).
</div>

---

##  Vista Previa del Proyecto

![vintageToneApp](https://github.com/user-attachments/assets/7c571a42-2dc8-47bd-87f9-c2ae7b141dbd)


> [!TIP]
> Puedes ver el sitio en vivo aquí: **[Demo en Vivo](https://vintagetone-front-vue.vercel.app)**

---

## Características Principales

###  Experiencia de Compra Completa
- **Catálogo Dinámico:** Navegación por categorías y subcategorías con filtros reactivos.
- **Búsqueda Avanzada:** Sistema de búsqueda predictiva con resultados en tiempo real.
- **Carrito de Compras:** Gestión completa de productos (añadir, quitar, persistencia).
- **Favoritos:** Lista de deseos personalizada para cada usuario.

###  Gestión de Usuarios y Seguridad
- **Autenticación Robusta:** Registro e inicio de sesión - Autenticación segura con manejo responsable de credenciales y sesiones.
- **Sistema de roles:** Permisos que separa claramente usuarios regulares y administradores.
- **Perfiles Personalizados:** Gestión de información personal y subida de avatares.
- **Roles y Permisos:** Diferenciación clara entre usuarios regulares y administradores.
- **Validación de datos:** Acceso y uso de middlewares de seguridad para prevenir accesos no autorizados y abusos.

### Panel de Administración (Back-Office)
- **Gestión de Inventario:** Interfase para que administradores puedan gestionar productos y stock.
- **Monitoreo de Órdenes:** Visualización y control de pedidos realizados.

### Diseño y UX
- **Responsive Design:** Totalmente adaptado a móviles, tablets y escritorio.
- **UX?UI:** Uso de DaisyUI y Tailwind 4 para una interfaz moderna y fluida.
- **Micro-interacciones:** Animaciones suaves en transiciones de página y elementos interactivos.

---

## 🛠️ Stack Tecnológico

### 🎨 Frontend

| Tecnología | Propósito |
| :--- | :--- |
| **Vue 3 (Composition API)** | Framework principal para una interfaz reactiva, modular y escalable. |
| **Pinia** | Gestión de estado global (autenticación, carrito, productos, favoritos). |
| **Vue Router** | Sistema de navegación con guardias de seguridad y control de acceso. |
| **Tailwind CSS 4** | Framework de estilos utilitarios moderno y altamente personalizable. |
| **DaisyUI** | Componentes UI consistentes y accesibles basados en Tailwind. |
| **Axios** | Cliente HTTP para la comunicación con la API REST. |
| **Lucide Vue** | Set de iconos modernos y minimalistas. |
| **Vue Sonner** | Sistema de notificaciones (toasts) fluido y desacoplado. |

---

### ⚙️ Backend

| Tecnología | Propósito |
| :--- | :--- |
| **Node.js + Express** | API REST robusta y escalable. |
| **MongoDB + Mongoose** | Base de datos NoSQL con modelado de esquemas y validaciones. |
| **JWT (jsonwebtoken)** | Autenticación y autorización segura basada en tokens. |
| **bcryptjs** | Hashing seguro de contraseñas y credenciales sensibles. |
| **Zod** | Validación estricta de datos de entrada y reglas de negocio. |
| **Helmet** | Endurecimiento de seguridad mediante headers HTTP. |
| **Express Rate Limit** | Protección contra abuso de requests y ataques de fuerza bruta. |
| **CORS** | Control de acceso entre dominios (Frontend ↔ Backend). |
| **Cookie Parser** | Manejo seguro de cookies HTTP. |
| **Multer** | Manejo y validación de subida de archivos. |
| **Cloudinary** | Almacenamiento y gestión segura de imágenes en la nube. |
| **Mercado Pago SDK** | Integración de pagos y procesamiento de transacciones. |
| **Morgan** | Logging de requests para monitoreo y debugging. |
| **dotenv / cross-env** | Gestión de variables de entorno según el entorno de ejecución. |

---

### ☁️ Infraestructura y Deploy

| Tecnología | Propósito |
| :--- | :--- |
| **Vercel** | Hosting del frontend con soporte SPA y despliegue continuo. |
| **Render** | Hosting del backend con gestión de servicios y escalado automático. |
| **MongoDB Atlas** | Base de datos en la nube con alta disponibilidad. |
| **Cloudinary CDN** | Distribución optimizada de assets multimedia. |
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

##  Desarrollado por 

Lautaro Rodriguez Collins - [LinkedIn](https://www.linkedin.com/in/lautaro-rodr%C3%ADguez-collins-40505624a/) - [Portfolio]([https://tu-portfolio.com](https://lautaro-rodriguez-collins.vercel.app/))

Proyecto creado para mi Portfolio Profesional.

##  Mas vistas
<img width="1366" height="4219" alt="Screenshot 2026-01-17 at 17-25-06 Vintage Tone" src="https://github.com/user-attachments/assets/fe321c8b-79d3-4d32-935d-374a87dc4496" />

<img width="1366" height="2841" alt="Screenshot 2026-01-17 at 17-25-34 Vintage Tone" src="https://github.com/user-attachments/assets/87c37064-2e00-4a02-bff5-035336f7b8bf" />



