from rest_framework import serializers
from .models import Localidad, Provincia, General, Parroquia, Sacerdote, RegistroHistorico


class LocalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Localidad
        fields = '__all__'


class ProvinciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provincia
        fields = '__all__'


class GeneralSerializer(serializers.ModelSerializer):
    class Meta:
        model = General
        fields = '__all__'


class ParroquiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parroquia
        fields = '__all__'


class SacerdoteSerializer(serializers.ModelSerializer):
    par_codi = ParroquiaSerializer(read_only=True)
    par_codi_id = serializers.PrimaryKeyRelatedField(
        queryset=Parroquia.objects.all(),
        source='par_codi',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = Sacerdote
        fields = '__all__'


class RegistroHistoricoSerializer(serializers.ModelSerializer):
    arc_parroquia = ParroquiaSerializer(read_only=True)
    arc_parroquia_id = serializers.PrimaryKeyRelatedField(
        queryset=Parroquia.objects.all(),
        source='arc_parroquia',
        write_only=True,
        required=False
    )
    arc_sacerdote = SacerdoteSerializer(read_only=True)
    arc_sacerdote_id = serializers.PrimaryKeyRelatedField(
        queryset=Sacerdote.objects.all(),
        source='arc_sacerdote',
        write_only=True,
        required=False
    )
    
    class Meta:
        model = RegistroHistorico
        fields = '__all__'
        read_only_fields = ('arc_fechr', 'arc_fechm')
