from rest_framework import viewsets, permissions
from apps.services.models import Service
from apps.services.serializers import (
    ServiceListSerializer,
    ServiceDetailSerializer,
    ServiceAdminSerializer,
)


class ServiceViewSet(viewsets.ModelViewSet):
    """
    Public: GET list (active only), GET detail (by pk or slug)
    Admin:  Full CRUD
    """

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Service.objects.all()
        return Service.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return ServiceAdminSerializer
        if self.action == 'retrieve':
            return ServiceDetailSerializer
        return ServiceListSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
