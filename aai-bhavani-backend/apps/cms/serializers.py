from rest_framework import serializers
from apps.cms.models import (
    SiteSettings, PageSection, HeroSection, NavigationItem, SEOSettings,
    EmailTemplate, WhatsAppTemplate,
)


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SiteSettings
        fields = '__all__'


class PageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = PageSection
        fields = '__all__'


class PageSectionReorderSerializer(serializers.Serializer):
    """Drag & drop reorder ke liye"""
    page     = serializers.CharField()
    sections = serializers.ListField(
        child=serializers.DictField()  # [{"id": 1, "order": 1}, ...]
    )


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = HeroSection
        fields = '__all__'


class NavigationItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model  = NavigationItem
        fields = ['id', 'label', 'link', 'order', 'is_visible', 'open_new_tab', 'children']

    def get_children(self, obj):
        qs = obj.children.filter(is_visible=True).order_by('order')
        return NavigationItemSerializer(qs, many=True).data


class SEOSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SEOSettings
        fields = '__all__'


# ── New Template Serializers ──────────────────────────────────────────────────

class EmailTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = EmailTemplate
        fields = '__all__'


class WhatsAppTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = WhatsAppTemplate
        fields = '__all__'
