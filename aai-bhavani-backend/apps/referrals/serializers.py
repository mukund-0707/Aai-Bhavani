from rest_framework import serializers
from apps.referrals.models import ReferralSubmission


class ReferralSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ReferralSubmission
        fields = '__all__'
        read_only_fields = ['status', 'deal_value', 'commission_paid', 'notes', 'created_at']


class ReferralAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ReferralSubmission
        fields = '__all__'
