from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status

from apps.inquiries.models import InquiryCategory, Inquiry
from apps.inquiries.serializers import (
    InquiryCategorySerializer,
    InquiryCategoryAdminSerializer,
    InquirySerializer,
    InquiryAdminSerializer,
)


class InquiryCategoryViewSet(viewsets.ModelViewSet):
    """
    Public: GET list — filter using ?service=<slug>
        - Service has categories → return list
        - Service has no categories → return [] empty list
        - No filter → return all active categories
    Admin: Full CRUD
    """

    def get_serializer_class(self):
        # No Auth mode: always return admin serializer
        return InquiryCategoryAdminSerializer

    def get_queryset(self):
        qs = InquiryCategory.objects.select_related('service')
        # ?service=<slug> filter
        service_slug = self.request.query_params.get('service')
        if service_slug:
            qs = qs.filter(service__slug=service_slug, is_active=True)
        return qs

    def get_permissions(self):
        # No Auth mode — AllowAny for all actions
        return [permissions.AllowAny()]


class InquiryViewSet(viewsets.ModelViewSet):
    """
    Public: POST — submit an inquiry
    Admin:  GET list/detail, PATCH (status + notes update)
    """

    def get_serializer_class(self):
        # Use admin serializer for GET, public serializer for POST
        if self.action == 'create':
            return InquirySerializer
        return InquiryAdminSerializer

    def get_queryset(self):
        return Inquiry.objects.select_related('service', 'category').all()

    def get_permissions(self):
        # No Auth mode — AllowAny for all actions
        return [permissions.AllowAny()]

    def create(self, request, *args, **kwargs):
        serializer = InquirySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()

        # Fire notifications after inquiry is saved — return 201 even if they fail
        whatsapp_url = None
        try:
            from apps.core.notifications import NotificationService
            whatsapp_url = NotificationService.send_inquiry_notifications(inquiry)
        except Exception:
            pass

        return Response(
            {
                'success':      True,
                'message':      'Inquiry submitted! We will contact you shortly.',
                'whatsapp_url': whatsapp_url,
            },
            status=status.HTTP_201_CREATED
        )
