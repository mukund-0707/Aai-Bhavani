from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status

from apps.referrals.models import ReferralSubmission
from apps.referrals.serializers import ReferralSubmissionSerializer, ReferralAdminSerializer


class ReferralSubmissionViewSet(viewsets.ModelViewSet):
    """
    Public: POST — referral submit karo
    Admin:  GET list/detail, PATCH (status + commission update)
    """

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return ReferralAdminSerializer
        return ReferralSubmissionSerializer

    def get_queryset(self):
        # Always return full queryset — permissions handle access control
        return ReferralSubmission.objects.select_related('service').all()

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = ReferralSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        referral = serializer.save()

        # Notifications — referral save hone ke baad fire karo
        whatsapp_url = None
        try:
            from apps.core.notifications import NotificationService
            whatsapp_url = NotificationService.send_referral_notifications(referral)
        except Exception:
            pass

        return Response(
            {
                'success':      True,
                'message':      'Referral submit ho gaya! Hum jald contact karenge.',
                'whatsapp_url': whatsapp_url,
            },
            status=status.HTTP_201_CREATED
        )
