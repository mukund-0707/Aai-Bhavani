from rest_framework import serializers
from apps.inquiries.models import InquiryCategory, Inquiry


class InquiryCategorySerializer(serializers.ModelSerializer):
    """Public — form dropdown ke liye."""
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
        # Category diya hai to check karo ki woh us service se belong karti hai
        service  = data.get('service')
        category = data.get('category')
        if category and service and category.service_id != service.id:
            raise serializers.ValidationError(
                {'category': 'Yeh category is service se belong nahi karti.'}
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
