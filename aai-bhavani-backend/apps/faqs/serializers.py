from rest_framework import serializers
from apps.faqs.models import FAQ

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model  = FAQ
        fields = '__all__'
