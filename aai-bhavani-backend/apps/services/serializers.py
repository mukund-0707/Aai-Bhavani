from rest_framework import serializers
from apps.services.models import Service, ReferralProgram


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Service
        fields = '__all__'


class ReferralProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ReferralProgram
        fields = '__all__'
