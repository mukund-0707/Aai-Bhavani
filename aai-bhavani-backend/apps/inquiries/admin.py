from django.contrib import admin
from apps.inquiries.models import InquiryCategory, Inquiry


@admin.register(InquiryCategory)
class InquiryCategoryAdmin(admin.ModelAdmin):
    list_display  = ['name', 'service', 'is_active', 'order']
    list_filter   = ['is_active', 'service']
    list_editable = ['is_active', 'order']
    ordering      = ['service', 'order']


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display   = ['name', 'phone', 'service', 'category', 'status', 'created_at']
    list_filter    = ['status', 'service', 'category']
    search_fields  = ['name', 'phone', 'email']
    readonly_fields = ['name', 'phone', 'email', 'message', 'service', 'category', 'created_at']
    list_per_page  = 25

    fieldsets = (
        ('Inquiry Details', {
            'fields': ('name', 'phone', 'email', 'service', 'category', 'message', 'created_at')
        }),
        ('Admin', {
            'fields': ('status', 'notes')
        }),
    )
