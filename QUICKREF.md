# Archivo Histórico - Referencia Rápida

## 🚀 Inicio Rápido

### Terminal 1: Backend
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```

Luego abre:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **Admin**: http://localhost:8000/admin

---

## 📊 Modelos Disponibles

### 1. **Localidad** (Ciudades/Pueblos)
- `loc_codi` - Código único
- `loc_nomb` - Nombre
- `loc_desc` - Descripción
- `loc_activo` - Estado

### 2. **Provincia** (Regiones)
- `prov_codi` - Código único
- `prov_nomb` - Nombre
- `prov_desc` - Descripción
- `prov_activo` - Estado

### 3. **General** (Datos Generales del Sistema)
- `gen_codi` - Código único
- `gen_nomb` - Nombre
- `gen_valor` - Valor
- `gen_activo` - Estado

### 4. **Parroquia** (Iglesias)
- `par_codi` - Código único
- `par_nomb` - Nombre
- `par_ubicacion` - Ubicación
- `par_activo` - Estado

### 5. **Sacerdote** (Miembros del Clero)
- `sac_codi` - Código único
- `sac_nomb` - Nombre
- `sac_apel` - Apellido
- `sac_fecha_nac` - Fecha de nacimiento
- `sac_fecha_ord` - Fecha de ordenación
- `sac_parroquia` - Parroquia asignada
- `sac_activo` - Estado

### 6. **Registro Histórico** (Documentos del Archivo)

#### Datos Principales
- `arc_codi` - Código único
- `arc_fech` - Fecha del documento
- `arc_titu` - Título
- `arc_desc` - Descripción

#### Referencias y Clasificación
- `arc_orig` - Origen
- `arc_cate` - Categoría

#### Numeración y Fechas
- `arc_año` - Año
- `arc_npro` - Número protocolar
- `arc_seg` - Segmento

#### Asunto y Alcances
- `arc_tema` - Tema
- `arc_area` - Área
- `arc_asun` - Asunto
- `arc_inic` - Iniciador
- `arc_dest` - Destinatario

#### Grupos y Series
- `arc_grup` - Grupo
- `arc_seri` - Serie
- `arc_sser` - Subserie

#### Conservación y Ubicación
- `arc_sopo` - Soporte
- `arc_esta` - Estado
- `arc_conA` - Condición de acceso
- `arc_conR` - Condición de reproducción
- `arc_leng` - Lengua
- `arc_orco` - Original/Copia (boolean)
- `arc_lugD` - Lugar destino

#### Ubicación Física
- `arc_ubsa` - Ubicación sala
- `arc_pasi` - Pasillo
- `arc_estan` - Estantería
- `arc_casi` - Casillero
- `arc_caja` - Número caja

#### Numeración de Documentos
- `arc_lega` - Legajo
- `arc_nume` - Número
- `arc_foli` - Folios
- `arc_hoja` - Hoja
- `arc_medi` - Medidas

#### Metadata y Observaciones
- `arc_meta` - Metadata
- `arc_obse` - Nota archivero

---

## 🔌 Endpoints API

### Autenticación
- `POST /api/token/` - Obtener token JWT
- `POST /api/token/refresh/` - Refrescar token

### Localidades
- `GET /api/localidades/` - Listar todas
- `POST /api/localidades/` - Crear nueva
- `GET /api/localidades/{id}/` - Obtener detalle
- `PUT /api/localidades/{id}/` - Actualizar
- `DELETE /api/localidades/{id}/` - Eliminar

### Provincias
- `GET /api/provincias/` - Listar todas
- `POST /api/provincias/` - Crear nueva
- (similar a localidades)

### General
- `GET /api/generales/` - Listar todas
- `POST /api/generales/` - Crear nueva
- (similar a localidades)

### Parroquias
- `GET /api/parroquias/` - Listar todas
- `POST /api/parroquias/` - Crear nueva
- (similar a localidades)

### Sacerdotes
- `GET /api/sacerdotes/` - Listar todos
- `POST /api/sacerdotes/` - Crear nuevo
- (similar a localidades)

### Registros Históricos
- `GET /api/registros/` - Listar todos
- `POST /api/registros/` - Crear nuevo
- `GET /api/registros/?arc_año=2024` - Filtrar por año
- `GET /api/registros/?arc_cate=Matrimonios` - Filtrar por categoría
- `GET /api/registros/?arc_tema=Bautismos` - Filtrar por tema
- `GET /api/registros/?search=término` - Buscar
- (similar a localidades)

---

## 📁 Estructura de Carpetas

```
archivo_historico/
├── backend/
│   ├── gestion/                    # Aplicación Django
│   │   ├── __init__.py
│   │   ├── models.py              # Modelos de datos ✅
│   │   ├── views.py               # ViewSets API ✅
│   │   ├── serializers.py         # Serializadores ✅
│   │   ├── urls.py                # URLs ✅
│   │   ├── admin.py               # Admin Django ✅
│   │   └── apps.py
│   ├── config/                    # Configuración Django
│   │   ├── __init__.py
│   │   ├── settings.py            # Settings ✅
│   │   ├── urls.py                # URLs principales ✅
│   │   ├── wsgi.py                # WSGI ✅
│   │   └── asgi.py                # ASGI ✅
│   ├── manage.py                  # Django CLI ✅
│   ├── requirements.txt           # Dependencias ✅
│   ├── .env                       # Variables de entorno ✅
│   ├── .gitignore                 # Git ignore ✅
│   ├── Dockerfile                 # Docker ✅
│   └── db.sqlite3                 # Base de datos (generada)
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx               # Página de inicio ✅
│   │   └── registros.tsx          # Página de registros ✅
│   ├── components/
│   │   ├── Layout.tsx             # Layout principal ✅
│   │   ├── RegistroForm.tsx       # Formulario ✅
│   │   └── RegistroList.tsx       # Lista de registros ✅
│   ├── lib/
│   │   ├── api.ts                 # Cliente API ✅
│   │   └── store.ts               # Zustand store ✅
│   ├── package.json               # Dependencias ✅
│   ├── next.config.js             # Config Next.js ✅
│   ├── tsconfig.json              # Config TypeScript ✅
│   ├── .env.local                 # Variables de entorno ✅
│   ├── .gitignore                 # Git ignore ✅
│   ├── Dockerfile                 # Docker ✅
│   └── node_modules/              # Paquetes (generados)
│
├── docker-compose.yml             # Docker Compose ✅
├── README.md                       # Documentación ✅
├── INSTALLATION.md                # Guía de instalación ✅
└── QUICKREF.md                    # Esta referencia ✅
```

---

## 🔑 Credenciales de Prueba

Al instalar, crea un superuser:
```bash
python manage.py createsuperuser
```

Úsalas en:
- Admin Django: http://localhost:8000/admin
- API: Obtén token con tus credenciales

---

## 🎨 Diseño

### Colores principales
- Blanco: `#fff`
- Gris claro: `#fafafa`, `#f5f5f5`
- Gris medio: `#e5e5e5`
- Gris oscuro: `#333`
- Azul iglesia: `#2d5f6f`

### Tipografía
- Font stack: System fonts (macOS, Windows, Linux compatible)
- Sin dependencias de Google Fonts (offline-first)

---

## 📝 Ejemplo de Uso API

### 1. Obtener token
```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password"}'
```

Respuesta:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### 2. Crear registro histórico
```bash
curl -X POST http://localhost:8000/api/registros/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "arc_codi": "ARQ-2026-001",
    "arc_titu": "Acta de Bautismo",
    "arc_fech": "1985-06-15",
    "arc_desc": "Registro de bautismo de la iglesia",
    "arc_año": 1985,
    "arc_cate": "Bautismos"
  }'
```

### 3. Buscar registros
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  "http://localhost:8000/api/registros/?search=bautismo&arc_año=1985"
```

---

## 🔐 Variables de Entorno

### Backend (.env)
```
SECRET_KEY=change-this-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## ✅ Checklist de Instalación

- [ ] Python 3.10+ instalado
- [ ] Node.js 18+ instalado
- [ ] Backend clonado
- [ ] Entorno virtual creado
- [ ] `pip install -r requirements.txt` ejecutado
- [ ] `python manage.py migrate` ejecutado
- [ ] Superuser creado
- [ ] Backend corriendo en puerto 8000
- [ ] Frontend clonado
- [ ] `npm install` ejecutado
- [ ] Frontend corriendo en puerto 3000
- [ ] Admin accesible en http://localhost:8000/admin

---

## 📞 Soporte

Para preguntas o problemas, consulta:
1. `INSTALLATION.md` - Guía completa de instalación
2. `README.md` - Documentación general
3. Admin Django - Ver datos cargados
4. API endpoints - Probar con curl o Postman

---

**Versión**: 1.0.0  
**Última actualización**: Junio 2026
