from rest_framework import serializers
from apps.services.models import Service


class ServiceListSerializer(serializers.ModelSerializer):
    """Public list view — short info."""
    class Meta:
        model  = Service
        fields = [
            'id', 'title', 'slug', 'icon', 'banner_image',
            'short_description', 'order',
            'is_referral_enabled', 'referral_type', 'referral_value', 'referral_note',
        ]


class ServiceDetailSerializer(serializers.ModelSerializer):
    """Public detail view — full info."""
    class Meta:
        model  = Service
        fields = '__all__'


class ServiceAdminSerializer(serializers.ModelSerializer):
    """Admin CRUD — all fields."""
    class Meta:
        model  = Service
        fields = '__all__'
        read_only_fields = ['created_at']
