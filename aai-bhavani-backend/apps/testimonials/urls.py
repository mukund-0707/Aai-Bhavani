from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.testimonials.views import TestimonialViewSet
router = DefaultRouter()
router.register('', TestimonialViewSet, basename='testimonial')
urlpatterns = [path('', include(router.urls))]
