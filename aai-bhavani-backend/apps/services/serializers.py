from rest_framework import serializers
from apps.services.models import Service


class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Service
        fields = [
            'id', 'title', 'slug', 'icon', 'banner_image',
            'short_description', 'order',
            'is_referral_enabled', 'referral_type', 'referral_value', 'referral_note',
        ]


class ServiceDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Service
        fields = '__all__'


class ServiceAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Service
        fields = [
            'id', 'title', 'slug', 'icon', 'banner_image',
            'short_description', 'long_description',
            'order', 'is_active', 'created_at',
            'is_referral_enabled', 'referral_type', 'referral_value', 'referral_note',
        ]
        read_only_fields = ['id', 'created_at', 'banner_image']
