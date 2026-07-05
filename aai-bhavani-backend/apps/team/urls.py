from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.team.views import TeamMemberViewSet
router = DefaultRouter()
router.register('', TeamMemberViewSet, basename='team')
urlpatterns = [path('', include(router.urls))]
