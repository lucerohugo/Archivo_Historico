# Archivo Histórico - Guía de Instalación

## Opción 1: Instalación Manual (Recomendado para desarrollo)

### Requisitos previos

- Python 3.10+
- Node.js 18+
- pip (gestor de paquetes de Python)
- npm (gestor de paquetes de Node)

### Backend (Django)

```bash
# 1. Navegar a la carpeta backend
cd backend

# 2. Crear y activar el entorno virtual
python -m venv venv

# En macOS/Linux:
source venv/bin/activate

# En Windows:
venv\Scripts\activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Crear la base de datos
python manage.py migrate

# 5. Crear usuario administrador (superuser)
python manage.py createsuperuser

# 6. Iniciar el servidor
python manage.py runserver

# El servidor estará disponible en: http://localhost:8000
# Admin en: http://localhost:8000/admin
```

### Frontend (Next.js)

```bash
# En otra terminal/pestaña

# 1. Navegar a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

# El servidor estará disponible en: http://localhost:3000
```

---

## Opción 2: Instalación con Docker Compose

### Requisitos previos

- Docker
- Docker Compose

### Pasos

```bash
# 1. Desde la raíz del proyecto
docker-compose up -d

# Esto iniciará:
# - PostgreSQL en puerto 5432
# - Django Backend en puerto 8000
# - Next.js Frontend en puerto 3000

# 2. Crear superuser (en otra terminal)
docker-compose exec backend python manage.py createsuperuser

# 3. Ver logs
docker-compose logs -f

# 4. Detener servicios
docker-compose down
```

---

## Primeros Pasos

### 1. Acceder al Admin Django

1. Abre http://localhost:8000/admin
2. Inicia sesión con las credenciales del superuser
3. Verás todos los modelos disponibles

### 2. Crear datos de prueba

En el admin Django, puedes crear:

- **Localidades**: Ciudades/pueblos
- **Provincias**: Provincias/regiones
- **Parroquias**: Iglesias/parroquias
- **Sacerdotes**: Miembros del clero
- **Registros Históricos**: Documentos del archivo

### 3. Usar la API REST

Los endpoints están disponibles en: `http://localhost:8000/api/`

Ejemplo:
```bash
curl http://localhost:8000/api/parroquias/
```

### 4. Autenticación JWT

Obtener token:
```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "tusuario", "password": "tucontraseña"}'
```

Usar token:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/registros/
```

---

## Variables de Entorno

### Backend (.env)

```
SECRET_KEY=tu-clave-secreta
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## Estructura de Carpetas

```
archivo_historico/
├── backend/
│   ├── gestion/              # Aplicación principal Django
│   ├── config/               # Configuración Django
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   ├── Dockerfile
│   └── db.sqlite3 (generado después de migrar)
│
├── frontend/
│   ├── app/                  # Páginas Next.js
│   ├── components/           # Componentes React
│   ├── lib/                  # Utilidades
│   ├── package.json
│   ├── .env.local
│   ├── Dockerfile
│   └── node_modules/ (generado después de npm install)
│
├── docker-compose.yml
├── README.md
└── INSTALLATION.md (este archivo)
```

---

## Troubleshooting

### Error: "ModuleNotFoundError: No module named 'django'"

Asegúrate de:
1. Estar en el entorno virtual activado
2. Haber ejecutado `pip install -r requirements.txt`

### Error: "connection refused" en frontend

Verifica que:
1. El backend está corriendo en puerto 8000
2. La variable `NEXT_PUBLIC_API_URL` está configurada correctamente

### Error: "database locked"

Si usas SQLite:
1. Asegúrate de no tener dos instancias de Django corriendo
2. Borra `db.sqlite3` y vuelve a ejecutar `python manage.py migrate`

### Puerto ya en uso

```bash
# Encontrar proceso en puerto
lsof -i :8000  # Backend
lsof -i :3000  # Frontend

# Matar proceso (si es necesario)
kill -9 <PID>
```

---

## Comandos Útiles

### Django

```bash
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superuser
python manage.py createsuperuser

# Limpiar caché
python manage.py clear_cache

# Cargar datos de prueba
python manage.py loaddata fixtures/initial.json
```

### Next.js

```bash
# Build para producción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

---

## Próximos Pasos

1. Personalizar el tema visual
2. Implementar búsqueda avanzada
3. Agregar paginación en frontend
4. Crear reportes PDF/Excel
5. Implementar subida de documentos
6. Agregar tests
7. Desplegar en producción

---

## Soporte

Para reportar problemas o sugerencias, contacta al administrador del sistema.

**Última actualización**: Junio 2026
