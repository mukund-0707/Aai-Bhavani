from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.properties.views import PropertyViewSet

router = DefaultRouter()
router.register('', PropertyViewSet, basename='property')

urlpatterns = [path('', include(router.urls))]
