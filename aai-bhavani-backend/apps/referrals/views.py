from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status

from apps.referrals.models import ReferralSubmission
from apps.referrals.serializers import ReferralSubmissionSerializer, ReferralAdminSerializer


class ReferralViewSet(viewsets.ModelViewSet):

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return ReferralAdminSerializer
        return ReferralSubmissionSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return ReferralSubmission.objects.all()
        return ReferralSubmission.objects.none()

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        serializer = ReferralSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {'success': True, 'message': 'Referral submitted! We will reach out soon.'},
            status=status.HTTP_201_CREATED
        )
