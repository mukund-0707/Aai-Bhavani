from rest_framework import serializers
from apps.inquiries.models import InquiryCategory, Inquiry


class InquiryCategorySerializer(serializers.ModelSerializer):
    """Public — for the inquiry form dropdown."""
    class Meta:
        model  = InquiryCategory
        fields = ['id', 'name', 'order']


class InquiryCategoryAdminSerializer(serializers.ModelSerializer):
    """Admin — full detail."""
    service_name = serializers.CharField(source='service.title', read_only=True)

    class Meta:
        model  = InquiryCategory
        fields = '__all__'


class InquirySerializer(serializers.ModelSerializer):
    """Public form submission."""

    class Meta:
        model  = Inquiry
        fields = ['id', 'service', 'category', 'name', 'phone', 'email', 'message']

    def validate(self, data):
        # If a category is provided, verify it belongs to the selected service
        service  = data.get('service')
        category = data.get('category')
        if category and service and category.service_id != service.id:
            raise serializers.ValidationError(
                {'category': 'This category does not belong to the selected service.'}
            )
        return data


class InquiryAdminSerializer(serializers.ModelSerializer):
    """Admin — full detail with related names."""
    service_name  = serializers.CharField(source='service.title',   read_only=True)
    category_name = serializers.CharField(source='category.name',   read_only=True)

    class Meta:
        model  = Inquiry
        fields = '__all__'
        read_only_fields = ['created_at']
