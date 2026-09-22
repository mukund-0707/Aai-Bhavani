from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status

from apps.referrals.models import ReferralSubmission
from apps.referrals.serializers import ReferralSubmissionSerializer, ReferralAdminSerializer


class ReferralSubmissionViewSet(viewsets.ModelViewSet):
    """
    Public: POST — submit a referral
    Admin:  GET list/detail, PATCH (status + commission update)
    """

    def get_serializer_class(self):
        if self.action == 'create':
            return ReferralSubmissionSerializer
        return ReferralAdminSerializer

    def get_queryset(self):
        return ReferralSubmission.objects.select_related('service').all()

    def get_permissions(self):
        # No Auth mode — AllowAny for all actions
        return [permissions.AllowAny()]

    def create(self, request, *args, **kwargs):
        serializer = ReferralSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        referral = serializer.save()

        # Fire notifications after referral is saved
        whatsapp_url = None
        try:
            from apps.core.notifications import NotificationService
            whatsapp_url = NotificationService.send_referral_notifications(referral)
        except Exception:
            pass

        return Response(
            {
                'success':      True,
                'message':      'Referral submitted! We will contact you shortly.',
                'whatsapp_url': whatsapp_url,
            },
            status=status.HTTP_201_CREATED
        )
