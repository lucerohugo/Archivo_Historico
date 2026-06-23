from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Crea un usuario de prueba'

    def handle(self, *args, **options):
        username = 'admin'
        password = 'admin123'
        
        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'El usuario "{username}" ya existe'))
        else:
            User.objects.create_superuser(username=username, email='admin@example.com', password=password)
            self.stdout.write(self.style.SUCCESS(f'Usuario "{username}" creado exitosamente'))
            self.stdout.write(f'Usuario: {username}')
            self.stdout.write(f'Contraseña: {password}')
