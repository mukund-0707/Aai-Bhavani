from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings

from apps.inquiries.models import InquiryCategory, Inquiry
from apps.inquiries.serializers import (
    InquiryCategorySerializer, InquiryCategoryAdminSerializer,
    InquirySerializer, InquiryAdminSerializer,
)


# ── InquiryCategory ViewSet ───────────────────────────────────────────────────

class InquiryCategoryViewSet(viewsets.ModelViewSet):
    """
    Public: GET list (active categories only) — form dropdown ke liye
    Admin:  Full CRUD — categories manage karo
    """

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return InquiryCategoryAdminSerializer
        return InquiryCategorySerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return InquiryCategory.objects.all()
        # Public sirf active categories dekhta hai
        return InquiryCategory.objects.filter(is_active=True)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


# ── Inquiry ViewSet ───────────────────────────────────────────────────────────

class InquiryViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return InquiryAdminSerializer
        return InquirySerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Inquiry.objects.select_related('category', 'property').all()
        return Inquiry.objects.none()  # Public sirf create kar sakta hai

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = InquirySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquiry = serializer.save()

        # Email notification — fail hone pe bhi inquiry saved rahegi
        self._send_email_notification(inquiry)

        return Response(
            {'success': True, 'message': 'Inquiry submitted! We will contact you soon.'},
            status=status.HTTP_201_CREATED
        )

    def _send_email_notification(self, inquiry):
        """
        Dynamic EmailTemplate use karo agar available ho,
        warna fallback plain text bhejo.
        """
        try:
            from apps.cms.models import EmailTemplate
            template = EmailTemplate.objects.filter(
                trigger=EmailTemplate.Trigger.INQUIRY_RECEIVED,
                is_active=True
            ).first()

            category_name = inquiry.category.name if inquiry.category else 'General Inquiry'

            if template:
                # Template ke placeholders replace karo
                context = {
                    'customer_name': inquiry.name,
                    'mobile':        inquiry.phone,
                    'email':         inquiry.email or 'N/A',
                    'category':      category_name,
                    'message':       inquiry.message or 'N/A',
                    'company_name':  settings.SITE_NAME if hasattr(settings, 'SITE_NAME') else 'Aai Bhavani Consultant',
                    'date':          inquiry.created_at.strftime('%d %b %Y, %I:%M %p'),
                }
                subject = _render_template(template.subject, context)
                body    = _render_template(template.body_text or template.body_html, context)
            else:
                # Fallback — hardcoded (safe net)
                subject = f"New Inquiry: {category_name} — {inquiry.name}"
                body = (
                    f"Name    : {inquiry.name}\n"
                    f"Phone   : {inquiry.phone}\n"
                    f"Email   : {inquiry.email or 'N/A'}\n"
                    f"Category: {category_name}\n"
                    f"Message : {inquiry.message or 'N/A'}"
                )

            send_mail(
                subject=subject,
                message=body,
                from_email=settings.EMAIL_HOST_USER or 'noreply@aaibhavani.com',
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,  # Email fail ho to API crash na ho
            )
        except Exception:
            pass  # Kisi bhi exception se inquiry save pe asar nahi padna chahiye


def _render_template(template_str, context):
    """
    Simple {{key}} placeholder replacement.
    Koi external dependency nahi chahiye.
    """
    result = template_str
    for key, value in context.items():
        result = result.replace(f'{{{{{key}}}}}', str(value))
    return result
