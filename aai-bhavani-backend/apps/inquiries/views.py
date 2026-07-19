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
    Public: GET list — ?service=<slug> se filter karo
        - Service mein categories hain → list return
        - Service mein categories nahi → [] empty list
        - No filter → saari active categories
    Admin: Full CRUD
    """

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return InquiryCategoryAdminSerializer
        return InquiryCategorySerializer

    def get_queryset(self):
        qs = InquiryCategory.objects.select_related('service')

        if not self.request.user.is_authenticated:
            qs = qs.filter(is_active=True)

        # ?service=<slug> filter
        service_slug = self.request.query_params.get('service')
        if service_slug:
            qs = qs.filter(service__slug=service_slug)

        return qs

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class InquiryViewSet(viewsets.ModelViewSet):
    """
    Public: POST — inquiry submit karo
    Admin:  GET list/detail, PATCH (status + notes update)
    """

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return InquiryAdminSerializer
        return InquirySerializer

    def get_queryset(self):
        # Always return full queryset — permissions handle access control
        return Inquiry.objects.select_related('service', 'category').all()

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = InquirySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()

        # Notifications — inquiry save hone ke baad fire karo
        # Fail hone pe bhi 201 return hoga
        whatsapp_url = None
        try:
            from apps.core.notifications import NotificationService
            whatsapp_url = NotificationService.send_inquiry_notifications(inquiry)
        except Exception:
            pass

        return Response(
            {
                'success':      True,
                'message':      'Inquiry submit ho gayi! Hum jald contact karenge.',
                'whatsapp_url': whatsapp_url,
            },
            status=status.HTTP_201_CREATED
        )
