from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from apps.properties.models import Property, PropertyImage
from apps.properties.serializers import PropertySerializer, PropertyImageSerializer


class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['type', 'category', 'city', 'is_featured', 'is_active']
    search_fields    = ['title', 'city', 'area', 'builder_name']
    ordering_fields  = ['price', 'created_at']

    def get_queryset(self):
        qs = Property.objects.prefetch_related('images').all()
        # No Auth mode: return all records including inactive ones
        # When JWT is added: filter(is_active=True) for unauthenticated
        # Price range filter
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        if min_price:
            qs = qs.filter(price__gte=min_price)
        if max_price:
            qs = qs.filter(price__lte=max_price)
        return qs

    def get_permissions(self):
        # No Auth mode — AllowAny for all actions
        # When JWT is added: restore IsAuthenticated for write actions
        return [permissions.AllowAny()]


class PropertyImageViewSet(viewsets.ModelViewSet):
    """
    Manage images for a property.
    POST   /api/properties/<property_pk>/images/            → upload image (multipart)
    PATCH  /api/properties/<property_pk>/images/<id>/       → update alt_text / is_primary / order
    DELETE /api/properties/<property_pk>/images/<id>/       → delete image
    POST   /api/properties/<property_pk>/images/<id>/set_primary/ → set as primary
    """
    serializer_class   = PropertyImageSerializer
    permission_classes = [permissions.AllowAny]  # No Auth mode

    def get_queryset(self):
        return PropertyImage.objects.filter(property_id=self.kwargs['property_pk'])

    def perform_create(self, serializer):
        property_id = self.kwargs['property_pk']
        prop = Property.objects.get(pk=property_id)
        # If this is the first image, make it primary automatically
        if not prop.images.exists():
            serializer.save(property=prop, is_primary=True)
        else:
            serializer.save(property=prop)

    @action(detail=True, methods=['post'], url_path='set_primary')
    def set_primary(self, request, property_pk=None, pk=None):
        """Set this image as primary, unset all others for this property."""
        image = self.get_object()
        PropertyImage.objects.filter(property_id=property_pk).update(is_primary=False)
        image.is_primary = True
        image.save()
        return Response(PropertyImageSerializer(image).data)
