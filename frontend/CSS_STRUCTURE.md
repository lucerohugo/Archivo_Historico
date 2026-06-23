# 📋 Estructura CSS y Componentes - Archivo Histórico

## 🏗️ Organización de Carpetas

```
frontend/
├── app/
│   ├── globals.css                 ← Variables globales y estilos base
│   ├── home.css                    ← Estilos para página de inicio (/)
│   ├── page.tsx                    ← Home page - usa home.css
│   ├── login/
│   │   ├── page.css                ← Estilos para login (/login)
│   │   └── page.tsx                ← Login - usa page.css
│   ├── registros/
│   │   └── page.tsx                ← Página pública de registros - usa globals.css
│   └── registrar/
│       └── page.tsx                ← Dashboard privado (protegido)
│
├── components/
│   ├── RegistroList.css            ← Estilos para tabla de registros
│   ├── RegistroList.tsx            ← Componente de lista - usa RegistroList.css
│   ├── RegistroForm.tsx
│   ├── RegistroDetail.tsx
│   ├── FileUpload.tsx
│   └── Layout.tsx
│
└── lib/
    └── api.ts                      ← Cliente API con JWT
```

## 🎨 Variables CSS Globales (globals.css)

Definidas en `:root`:

### Colores
- `--primary: #2d5f6f` - Teal oscuro (botones, encabezados)
- `--primary-dark: #1f3f4d` - Variante más oscura
- `--primary-light: #3d7f8f` - Variante más clara
- `--accent: #d9534f` - Rojo (errores, alertas)
- `--white: #ffffff` - Blanco
- `--gray-*` - Escala de grises (50-900)

### Espaciado
- `--spacing-xs: 0.25rem` (4px)
- `--spacing-sm: 0.5rem` (8px)
- `--spacing-md: 1rem` (16px)
- `--spacing-lg: 1.5rem` (24px)
- `--spacing-xl: 2rem` (32px)
- `--spacing-2xl: 3rem` (48px)

### Otros
- `--radius-sm: 4px`
- `--radius-md: 6px`
- `--radius-lg: 8px`
- `--shadow-md/lg/xl` - Sombras predefinidas
- `--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`

## 📝 Convenciones de Nombres de Clases

### Patrón BEM Simplificado
```
.[componente]-[elemento]
.[componente]-[elemento]--[modificador]
```

Ejemplos:
- `.login-page` - Contenedor principal
- `.login-form` - Formulario dentro de login
- `.login-button` - Botón dentro de login
- `.form-input` - Input de formulario genérico
- `.registro-list-table` - Tabla en RegistroList
- `.registro-list-file-badge` - Badge de archivo

## ✅ Buenas Prácticas Aplicadas

### 1. **Sin estilos inline**
- ❌ ANTES: `style={{ color: '#2d5f6f', fontSize: '1.5rem' }}`
- ✅ AHORA: `className="login-title"`

### 2. **Usar variables CSS**
- ❌ ANTES: Colores hardcodeados en componentes
- ✅ AHORA: `background-color: var(--primary)`

### 3. **Centralizar CSS**
- ❌ ANTES: Objetos `styles` dentro de componentes
- ✅ AHORA: Archivos `.css` separados por página/componente

### 4. **Reutilizar estilos base**
```css
/* Clases genéricas en globals.css */
.btn-primary { }
.btn-secondary { }
.form-group { }
.form-input { }
.error-message { }
```

### 5. **Transiciones y hover**
```css
.button {
  transition: var(--transition);
}

.button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}
```

## 🗂️ Estructura por Página

### Login (`app/login/page.css`)
- `.login-page` - Contenedor con gradiente
- `.login-container` - Card central
- `.login-form` - Formulario
- `.form-group` - Grupo de campo
- `.form-input` - Input de texto/password
- `.login-button` - Botón de envío
- `.error-message` - Mensaje de error

### Home (`app/home.css`)
- `.home-page` - Página completa
- `.home-container` - Contenido centrado
- `.home-title` - Título principal
- `.home-subtitle` - Subtítulo
- `.home-button` - Botón de acción

### Registros (`app/globals.css`)
- `.registros-page` - Contenedor principal
- `.registros-container` - Ancho máximo
- `.search-section` - Área de búsqueda
- `.filter-section` - Filtros
- `.table-container` - Tabla
- `.pagination` - Paginación

### Componente RegistroList (`components/RegistroList.css`)
- `.registro-list-container` - Contenedor tabla
- `.registro-list-table` - Tabla
- `.registro-list-files` - Contenedor de archivos
- `.registro-list-file-badge` - Badge individual
- `.registro-list-empty` - Estado vacío

## 🔄 Migrando Componentes (Template)

### Paso 1: Crear archivo CSS
```css
/* components/MiComponente.css */
.mi-componente { }
.mi-componente-titulo { }
.mi-componente-input { }
```

### Paso 2: Importar en el componente
```tsx
import './MiComponente.css';
```

### Paso 3: Reemplazar estilos inline
```tsx
// ❌ ANTES
<div style={{ padding: '1rem', background: 'white' }}>

// ✅ AHORA
<div className="mi-componente">
```

## 🎯 Próximos Pasos

1. ✅ Refactorizar `RegistroForm.tsx` - mover estilos a `RegistroForm.css`
2. ✅ Refactorizar `RegistroDetail.tsx` - mover estilos a `RegistroDetail.css`
3. ✅ Refactorizar `FileUpload.tsx` - mover estilos a `FileUpload.css`
4. ✅ Refactorizar `Layout.tsx` - mover estilos a `Layout.css`
5. ✅ Verificar `globals.css` para agregar clases reutilizables

## 📚 Referencias Útiles

- **CSS Variables**: Use `var(--nombre)` siempre para acceder a variables
- **Responsive**: Agregar media queries en cada `.css` si es necesario
- **Accesibilidad**: Mantener buen contraste de colores
- **Transiciones**: Siempre usar `--transition` para consistencia
