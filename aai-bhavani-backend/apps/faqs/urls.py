from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.faqs.views import FAQViewSet
router = DefaultRouter()
router.register('', FAQViewSet, basename='faq')
urlpatterns = [path('', include(router.urls))]
