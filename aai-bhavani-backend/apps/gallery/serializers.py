from rest_framework import serializers
from apps.gallery.models import GalleryItem


class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model  = GalleryItem
        fields = '__all__'
