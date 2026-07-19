from rest_framework import serializers
from apps.properties.models import Property, PropertyImage


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = PropertyImage
        fields = ['id', 'image', 'alt_text', 'is_primary', 'order']


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model  = Property
        fields = '__all__'
