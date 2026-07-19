from django.contrib import admin
from apps.services.models import Service


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display  = ['title', 'order', 'is_active', 'is_referral_enabled']
    list_filter   = ['is_active', 'is_referral_enabled']
    search_fields = ['title', 'slug']
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ['order', 'is_active']

    fieldsets = (
        ('Basic Info', {
            'fields': ('title', 'slug', 'icon', 'order', 'is_active')
        }),
        ('Content', {
            'fields': ('short_description', 'long_description', 'banner_image')
        }),
        ('Referral Settings', {
            'fields': ('is_referral_enabled', 'referral_type', 'referral_value', 'referral_note'),
            'description': 'Is service ke liye referral program enable karo.'
        }),
    )
