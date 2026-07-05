from rest_framework import viewsets, permissions
from django_filters.rest_framework import DjangoFilterBackend
from apps.gallery.models import GalleryItem
from apps.gallery.serializers import GalleryItemSerializer


class GalleryViewSet(viewsets.ModelViewSet):
    queryset         = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer
    filter_backends  = [DjangoFilterBackend]
    filterset_fields = ['category', 'media_type', 'is_featured']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
