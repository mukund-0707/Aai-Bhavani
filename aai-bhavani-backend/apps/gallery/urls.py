from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.gallery.views import GalleryViewSet

router = DefaultRouter()
router.register('', GalleryViewSet, basename='gallery')

urlpatterns = [path('', include(router.urls))]
