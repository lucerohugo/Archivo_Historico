from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LocalidadViewSet, ProvinciaViewSet, GeneralViewSet,
    ParroquiaViewSet, SacerdoteViewSet, RegistroHistoricoViewSet
)

router = DefaultRouter()
router.register(r'localidades', LocalidadViewSet, basename='localidad')
router.register(r'provincias', ProvinciaViewSet, basename='provincia')
router.register(r'generales', GeneralViewSet, basename='general')
router.register(r'parroquias', ParroquiaViewSet, basename='parroquia')
router.register(r'sacerdotes', SacerdoteViewSet, basename='sacerdote')
router.register(r'registros', RegistroHistoricoViewSet, basename='registro')

urlpatterns = [
    path('', include(router.urls)),
]
