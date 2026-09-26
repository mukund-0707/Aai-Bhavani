from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.core.models import SiteSettings, EmailTemplate, WhatsAppTemplate
from apps.core.serializers import (
    SiteSettingsSerializer,
    EmailTemplateSerializer,
    WhatsAppTemplateSerializer,
)


class SiteSettingsView(APIView):
    """
    GET  — public (logo, contact, hero content)
    PATCH — admin only (update site settings)
    """

    def get_permissions(self):
        # No Auth mode — AllowAny for all actions
        # When JWT is added: restore IsAuthenticated for PATCH
        return [permissions.AllowAny()]

    def get(self, request):
        settings = SiteSettings.get()
        serializer = SiteSettingsSerializer(settings)
        return Response(serializer.data)

    def patch(self, request):
        settings = SiteSettings.get()
        serializer = SiteSettingsSerializer(settings, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class EmailTemplateViewSet(viewsets.ModelViewSet):
    """Admin only — manage email templates."""
    queryset           = EmailTemplate.objects.all()
    serializer_class   = EmailTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]


class WhatsAppTemplateViewSet(viewsets.ModelViewSet):
    """Admin only — manage WhatsApp templates."""
    queryset           = WhatsAppTemplate.objects.all()
    serializer_class   = WhatsAppTemplateSerializer
    permission_classes = [permissions.IsAuthenticated]
