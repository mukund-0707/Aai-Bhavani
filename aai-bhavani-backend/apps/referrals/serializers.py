from rest_framework import serializers
from apps.referrals.models import ReferralSubmission


class ReferralSubmissionSerializer(serializers.ModelSerializer):
    """Public form submission — limited fields."""
    class Meta:
        model  = ReferralSubmission
        fields = [
            'id', 'referrer_name', 'referrer_phone', 'referrer_email',
            'client_name', 'client_phone', 'service',
        ]


class ReferralAdminSerializer(serializers.ModelSerializer):
    """Admin — full detail."""
    service_name = serializers.CharField(source='service.title', read_only=True)

    class Meta:
        model  = ReferralSubmission
        fields = '__all__'
        read_only_fields = ['created_at']
