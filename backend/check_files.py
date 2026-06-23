#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from gestion.models import RegistroHistorico, ArchivoAdjunto

# Obtener registros con archivos
registros = RegistroHistorico.objects.all()
for registro in registros:
    archivos = ArchivoAdjunto.objects.filter(registro=registro)
    if archivos.count() > 0:
        print(f"Registro {registro.arc_codi}: {registro.arc_titu}")
        print(f"  Archivos: {archivos.count()}")
        for archivo in archivos:
            print(f"    - {archivo.nombre} (ID: {archivo.id}, Field: {archivo.archivo})")
        print()
