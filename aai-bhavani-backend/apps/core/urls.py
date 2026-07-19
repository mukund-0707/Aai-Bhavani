from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.core.views import (
    SiteSettingsView,
    EmailTemplateViewSet,
    WhatsAppTemplateViewSet,
)

router = DefaultRouter()
router.register('core/email-templates',    EmailTemplateViewSet,    basename='email-template')
router.register('core/whatsapp-templates', WhatsAppTemplateViewSet, basename='whatsapp-template')

urlpatterns = [
    path('site-settings/', SiteSettingsView.as_view(), name='site-settings'),
    path('', include(router.urls)),
]
