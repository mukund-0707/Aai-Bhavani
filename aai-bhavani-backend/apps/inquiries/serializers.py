from rest_framework import serializers
from apps.inquiries.models import InquiryCategory, Inquiry


# ── InquiryCategory Serializers ───────────────────────────────────────────────

class InquiryCategorySerializer(serializers.ModelSerializer):
    """Public read — sirf active categories, minimal fields (form dropdown ke liye)"""
    class Meta:
        model  = InquiryCategory
        fields = ['id', 'name', 'slug', 'order']


class InquiryCategoryAdminSerializer(serializers.ModelSerializer):
    """Admin — full CRUD, sab fields"""
    class Meta:
        model  = InquiryCategory
        fields = '__all__'


# ── Inquiry Serializers ───────────────────────────────────────────────────────

class InquirySerializer(serializers.ModelSerializer):
    """Public submission — limited fields only"""
    # category_name read-only show karo (display ke liye)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model  = Inquiry
        fields = ['id', 'name', 'phone', 'email', 'message', 'category', 'category_name']
        extra_kwargs = {
            'name':     {'required': True},
            'phone':    {'required': True},
            'email':    {'required': False},
            'message':  {'required': False},
            'category': {'required': False},  # graceful — optional agar categories na hon
        }


class InquiryAdminSerializer(serializers.ModelSerializer):
    """Admin ke liye — sab fields, category name bhi nested"""
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model  = Inquiry
        fields = '__all__'
