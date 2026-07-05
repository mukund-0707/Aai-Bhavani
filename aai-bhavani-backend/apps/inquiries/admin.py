from django.contrib import admin
from apps.inquiries.models import InquiryCategory, Inquiry


@admin.register(InquiryCategory)
class InquiryCategoryAdmin(admin.ModelAdmin):
    list_display  = ['name', 'slug', 'is_active', 'order']
    list_editable = ['is_active', 'order']
    list_filter   = ['is_active']
    search_fields = ['name']
    prepopulated_fields = {'slug': ('name',)}  # Admin form mein slug auto-fill


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display   = ['name', 'phone', 'category', 'status', 'source', 'created_at']
    list_filter    = ['status', 'category', 'source']
    list_editable  = ['status']
    search_fields  = ['name', 'phone', 'email']
    readonly_fields = ['created_at']
    autocomplete_fields = []

    fieldsets = (
        ('Customer Info', {
            'fields': ('name', 'phone', 'email')
        }),
        ('Inquiry Details', {
            'fields': ('category', 'message', 'property')
        }),
        ('Admin Management', {
            'fields': ('status', 'source', 'notes')
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )
