from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.properties.views import PropertyViewSet, PropertyImageViewSet

router = DefaultRouter()
router.register('properties', PropertyViewSet, basename='property')

urlpatterns = [
    path('', include(router.urls)),
    # Images nested under property:
    # POST   /api/properties/<property_pk>/images/
    # PATCH  /api/properties/<property_pk>/images/<pk>/
    # DELETE /api/properties/<property_pk>/images/<pk>/
    # POST   /api/properties/<property_pk>/images/<pk>/set_primary/
    path(
        'properties/<int:property_pk>/images/',
        PropertyImageViewSet.as_view({'post': 'create', 'get': 'list'}),
        name='property-images-list',
    ),
    path(
        'properties/<int:property_pk>/images/<int:pk>/',
        PropertyImageViewSet.as_view({'patch': 'partial_update', 'delete': 'destroy', 'get': 'retrieve'}),
        name='property-images-detail',
    ),
    path(
        'properties/<int:property_pk>/images/<int:pk>/set_primary/',
        PropertyImageViewSet.as_view({'post': 'set_primary'}),
        name='property-images-set-primary',
    ),
]
