from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Localidad, Provincia, General, Parroquia, Sacerdote, RegistroHistorico
from .serializers import (
    LocalidadSerializer, ProvinciaSerializer, GeneralSerializer,
    ParroquiaSerializer, SacerdoteSerializer, RegistroHistoricoSerializer
)


class LocalidadViewSet(viewsets.ModelViewSet):
    queryset = Localidad.objects.all()
    serializer_class = LocalidadSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['loc_codi', 'loc_nomb']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['pci_codi']


class ProvinciaViewSet(viewsets.ModelViewSet):
    queryset = Provincia.objects.all()
    serializer_class = ProvinciaSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['pci_codi', 'pci_nomb']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]


class GeneralViewSet(viewsets.ModelViewSet):
    queryset = General.objects.all()
    serializer_class = GeneralSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['gen_codi', 'gen_nomb']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]


class ParroquiaViewSet(viewsets.ModelViewSet):
    queryset = Parroquia.objects.filter(par_acti=True)
    serializer_class = ParroquiaSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['par_codi', 'par_nomb']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]


class SacerdoteViewSet(viewsets.ModelViewSet):
    queryset = Sacerdote.objects.filter(sac_acti=True)
    serializer_class = SacerdoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['sac_codi', 'sac_nomb']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['par_codi']


class RegistroHistoricoViewSet(viewsets.ModelViewSet):
    queryset = RegistroHistorico.objects.filter(arc_acti=True)
    serializer_class = RegistroHistoricoSerializer
    permission_classes = [permissions.IsAuthenticated]
    search_fields = ['arc_codi', 'arc_titu', 'arc_desc', 'arc_asun']
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['arc_año', 'arc_cate', 'arc_tema', 'arc_parroquia', 'arc_sacerdote']
    ordering_fields = ['arc_fech', 'arc_año', 'arc_fechr']
    ordering = ['-arc_fech']
