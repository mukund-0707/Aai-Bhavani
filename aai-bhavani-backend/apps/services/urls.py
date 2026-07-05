from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.services.views import ServiceViewSet, ReferralProgramView

router = DefaultRouter()
router.register('', ServiceViewSet, basename='service')

urlpatterns = [
    path('', include(router.urls)),
]
