# Archivo Histórico - Iglesia

Sistema minimalista y elegante para la gestión de archivo histórico de documentos eclesiásticos.

## Estructura del Proyecto

```
archivo_historico/
├── backend/                    # Django REST API
│   ├── gestion/               # App principal
│   │   ├── models.py          # Modelos de datos
│   │   ├── views.py           # ViewSets de API
│   │   ├── serializers.py     # Serializadores
│   │   ├── urls.py            # URLs
│   │   └── admin.py           # Admin Django
│   ├── config/                # Configuración Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   └── .gitignore
│
└── frontend/                  # Next.js + React
    ├── app/                   # Páginas
    ├── components/            # Componentes React
    ├── lib/                   # Utilidades
    ├── package.json
    ├── next.config.js
    ├── tsconfig.json
    ├── .env.local
    └── .gitignore
```

## Modelos de Base de Datos

### Localidad
- loc_codi (PK)
- loc_nomb
- loc_desc

### Provincia
- prov_codi (PK)
- prov_nomb
- prov_desc

### General
- gen_codi (PK)
- gen_nomb
- gen_valor

### Parroquia
- par_codi (PK)
- par_nomb
- par_ubicacion

### Sacerdote
- sac_codi (PK)
- sac_nomb
- sac_apel
- sac_parroquia (FK)

### Registro Histórico
Contiene todos los campos especificados:
- Datos principales: arc_codi, arc_fech, arc_titu, arc_desc
- Referencias: arc_orig, arc_cate
- Numeración: arc_año, arc_npro, arc_seg
- Asunto: arc_tema, arc_area, arc_asun, arc_inic, arc_dest
- Grupos: arc_grup, arc_seri, arc_sser
- Conservación: arc_sopo, arc_esta, arc_conA, arc_conR, arc_leng, arc_orco, arc_lugD
- Ubicación: arc_ubsa, arc_pasi, arc_estan, arc_casi, arc_caja
- Numeración: arc_lega, arc_nume, arc_foli, arc_hoja, arc_medi
- Metadata: arc_meta
- Observaciones: arc_obse

## Instalación

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Acceso

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Admin Django: http://localhost:8000/admin

## API Endpoints

- `GET/POST /api/localidades/` - Localidades
- `GET/POST /api/provincias/` - Provincias
- `GET/POST /api/generales/` - Datos generales
- `GET/POST /api/parroquias/` - Parroquias
- `GET/POST /api/sacerdotes/` - Sacerdotes
- `GET/POST /api/registros/` - Registros históricos

## Autenticación

Usa JWT (JSON Web Tokens):
- `POST /api/token/` - Obtener token
- `POST /api/token/refresh/` - Refrescar token

## Características

✅ Modelos completamente definidos
✅ API REST con Django REST Framework
✅ Autenticación JWT
✅ Paginación y filtros
✅ Admin Django personalizado
✅ Frontend minimalista y elegante
✅ Diseño responsivo
✅ CORS configurado

## Próximos Pasos

- Implementar views completos en frontend
- Agregar búsqueda avanzada
- Generar reportes PDF/Excel
- Subida de documentos scaneados
- Sistema de auditoría
- Respaldos automáticos

## Licencia

Proyecto privado de la iglesia.
