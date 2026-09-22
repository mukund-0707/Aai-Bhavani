from rest_framework import viewsets, permissions
from apps.services.models import Service
from apps.services.serializers import (
    ServiceListSerializer,
    ServiceDetailSerializer,
    ServiceAdminSerializer,
)


class ServiceViewSet(viewsets.ModelViewSet):
    lookup_field = 'slug'

    def get_queryset(self):
        return Service.objects.all()

    def get_serializer_class(self):
        return ServiceAdminSerializer

    def get_permissions(self):
        return [permissions.AllowAny()]
