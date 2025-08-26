# CRUD React + Vite - Frontend

Este repositorio contiene el frontend de una aplicación CRUD completa de productos y usuarios, desarrollado con **React** y **Vite**.

> ⚠️ Para que este proyecto funcione correctamente, asegúrate de tener el backend corriendo. Puedes encontrar el repositorio del backend acá: [https://github.com/MatiJFernandez/API-REST-DB](https://github.com/MatiJFernandez/API-REST-DB)

## Requisitos

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Clonar el repositorio

```bash
git clone https://github.com/MatiJFernandez/FRONT-REACT.git
cd FRONT-REACT
```

## Instalación de dependencias

```bash
npm install
```

## Ejecutar servidor

```bash
npm run dev
```

## Funcionalidades Implementadas

✅ **Autenticación y Autorización**
- Sistema de login/logout con JWT
- Protección de rutas privadas y públicas
- Control de acceso por roles (admin, moderador, cliente)

✅ **Gestión de Productos**
- CRUD completo de productos
- Restricción de permisos por rol
- Búsqueda y filtrado

✅ **Gestión de Usuarios**
- CRUD completo de usuarios
- Cambio de roles (solo admin)
- Búsqueda y filtrado

✅ **Interfaz de Usuario**
- Navbar condicional según el estado de sesión
- Diseño responsive y profesional
- Confirmación antes de eliminar
- Toast notifications

## Usuarios de Prueba

### Admin (acceso completo)
- **Email:** admin@test.com
- **Contraseña:** admin123
- **Funcionalidades:** Productos + Usuarios + Panel Admin

### Moderador
- **Email:** mod@test.com
- **Contraseña:** admin123
- **Funcionalidades:** Productos + Gestión limitada

### Cliente (acceso limitado)
- **Email:** cliente@test.com
- **Contraseña:** admin123
- **Funcionalidades:** Solo visualización de productos

## Dependencias

Revisa el archivo `package.json` para ver las dependencias usadas.

## Ejemplos de Uso

### Productos
```json
{
    "id": 1,
    "nombre": "monitor",
    "precio": 48000
}
```

### Usuarios
```json
{
    "id": 1,
    "nombre": "Usuario Test",
    "email": "usuario@test.com",
    "password": "password123",
    "edad": 25,
    "rol": "cliente"
}
```

## Tecnologías Utilizadas

- **Frontend:** React 18, Vite, PrimeReact
- **Estado:** Context API
- **Validación:** Formik + Yup
- **Estilos:** CSS personalizado + PrimeReact
- **Autenticación:** JWT

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── context/            # Contextos de React (Auth, Products, Users)
├── layouts/            # Vistas principales
│   ├── auth/          # Login y registro
│   ├── home/          # Página principal
│   ├── products/      # Gestión de productos
│   └── users/         # Gestión de usuarios
├── utils/              # Utilidades y helpers
└── App.jsx            # Componente principal
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado por:** [Matías Fernández](https://github.com/MatiJFernandez)
