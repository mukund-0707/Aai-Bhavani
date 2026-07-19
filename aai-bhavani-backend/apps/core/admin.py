from django.contrib import admin
from apps.core.models import SiteSettings, EmailTemplate, WhatsAppTemplate


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Brand', {
            'fields': ('site_name', 'site_tagline', 'logo', 'favicon')
        }),
        ('Contact', {
            'fields': ('phone', 'whatsapp', 'email', 'address', 'google_map_url', 'working_hours')
        }),
        ('Social Media', {
            'fields': ('facebook_url', 'instagram_url', 'linkedin_url', 'youtube_url')
        }),
        ('Hero Section', {
            'fields': (
                'hero_title', 'hero_subtitle', 'hero_description',
                'hero_image', 'hero_button_text', 'hero_button_link'
            )
        }),
    )

    def has_add_permission(self, request):
        # Singleton — add nahi kar sakte, sirf existing edit kar sakte hain
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(EmailTemplate)
class EmailTemplateAdmin(admin.ModelAdmin):
    list_display  = ['name', 'trigger', 'is_active', 'updated_at']
    list_filter   = ['is_active', 'trigger']
    search_fields = ['name', 'subject']
    readonly_fields = ['updated_at']
    fieldsets = (
        (None, {
            'fields': ('name', 'trigger', 'is_active')
        }),
        ('Email Content', {
            'fields': ('subject', 'body_text', 'body_html'),
            'description': (
                'Placeholders: {{customer_name}}, {{mobile}}, {{email}}, '
                '{{service}}, {{category}}, {{message}}, '
                '{{company_name}}, {{whatsapp_number}}, {{date}}'
            )
        }),
    )


@admin.register(WhatsAppTemplate)
class WhatsAppTemplateAdmin(admin.ModelAdmin):
    list_display  = ['name', 'trigger', 'is_active', 'updated_at']
    list_filter   = ['is_active', 'trigger']
    search_fields = ['name']
    readonly_fields = ['updated_at']
    fieldsets = (
        (None, {
            'fields': ('name', 'trigger', 'is_active')
        }),
        ('Message Content', {
            'fields': ('template_body',),
            'description': (
                'Placeholders: {{customer_name}}, {{mobile}}, {{service}}, '
                '{{category}}, {{company_name}}, {{whatsapp_number}}, {{date}}'
            )
        }),
    )
