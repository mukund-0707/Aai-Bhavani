from rest_framework import serializers
from apps.core.models import SiteSettings, EmailTemplate, WhatsAppTemplate


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SiteSettings
        fields = [
            'site_name', 'site_tagline', 'logo', 'favicon',
            'phone', 'whatsapp', 'email', 'address',
            'google_map_url', 'working_hours',
            'facebook_url', 'instagram_url', 'linkedin_url', 'youtube_url',
            'hero_title', 'hero_subtitle', 'hero_description',
            'hero_image', 'hero_button_text', 'hero_button_link',
            'updated_at',
        ]
        read_only_fields = ['updated_at']


class EmailTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = EmailTemplate
        fields = '__all__'
        read_only_fields = ['updated_at']


class WhatsAppTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model  = WhatsAppTemplate
        fields = '__all__'
        read_only_fields = ['updated_at']
