from django.contrib import admin
from apps.cms.models import (
    SiteSettings, PageSection, HeroSection, NavigationItem, SEOSettings,
    EmailTemplate, WhatsAppTemplate,
)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Basic', {'fields': ('site_name', 'site_tagline', 'logo', 'favicon')}),
        ('Contact', {'fields': ('phone', 'whatsapp', 'email', 'address', 'google_map_url', 'working_hours')}),
        ('Social Media', {'fields': ('facebook_url', 'instagram_url', 'linkedin_url', 'youtube_url', 'twitter_url')}),
        ('Theme', {'fields': ('primary_color', 'secondary_color', 'background_color', 'font_family', 'border_radius', 'animation_speed')}),
    )


@admin.register(PageSection)
class PageSectionAdmin(admin.ModelAdmin):
    list_display  = ['page', 'section_type', 'order', 'is_visible']
    list_filter   = ['page', 'is_visible']
    list_editable = ['order', 'is_visible']
    ordering      = ['page', 'order']


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'updated_at']


@admin.register(NavigationItem)
class NavigationItemAdmin(admin.ModelAdmin):
    list_display  = ['label', 'link', 'order', 'is_visible']
    list_editable = ['order', 'is_visible']


@admin.register(SEOSettings)
class SEOSettingsAdmin(admin.ModelAdmin):
    list_display = ['page', 'meta_title', 'updated_at']


# ── Email Template Admin ──────────────────────────────────────────────────────

@admin.register(EmailTemplate)
class EmailTemplateAdmin(admin.ModelAdmin):
    list_display  = ['name', 'trigger', 'is_active', 'updated_at']
    list_filter   = ['is_active', 'trigger']
    list_editable = ['is_active']
    readonly_fields = ['updated_at']

    fieldsets = (
        ('Template Info', {
            'fields': ('name', 'trigger', 'is_active')
        }),
        ('Email Content', {
            'fields': ('subject', 'body_text', 'body_html'),
            'description': (
                'Available placeholders: {{customer_name}}, {{mobile}}, {{email}}, '
                '{{category}}, {{message}}, {{company_name}}, {{date}}'
            ),
        }),
        ('Timestamps', {
            'fields': ('updated_at',),
            'classes': ('collapse',),
        }),
    )


# ── WhatsApp Template Admin ───────────────────────────────────────────────────

@admin.register(WhatsAppTemplate)
class WhatsAppTemplateAdmin(admin.ModelAdmin):
    list_display  = ['name', 'trigger', 'is_active', 'updated_at']
    list_filter   = ['is_active', 'trigger']
    list_editable = ['is_active']
    readonly_fields = ['updated_at']

    fieldsets = (
        ('Template Info', {
            'fields': ('name', 'trigger', 'is_active')
        }),
        ('Message Content', {
            'fields': ('template_body',),
            'description': (
                'Available placeholders: {{customer_name}}, {{mobile}}, '
                '{{category}}, {{company_name}}, {{date}}'
            ),
        }),
        ('Timestamps', {
            'fields': ('updated_at',),
            'classes': ('collapse',),
        }),
    )
