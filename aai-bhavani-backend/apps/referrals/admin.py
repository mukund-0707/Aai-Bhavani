from django.contrib import admin
from apps.referrals.models import ReferralSubmission


@admin.register(ReferralSubmission)
class ReferralSubmissionAdmin(admin.ModelAdmin):
    list_display   = ['referrer_name', 'referrer_phone', 'client_name', 'service', 'status', 'commission_paid', 'created_at']
    list_filter    = ['status', 'service']
    search_fields  = ['referrer_name', 'referrer_phone', 'client_name']
    list_per_page  = 25
    readonly_fields = [
        'referrer_name', 'referrer_phone', 'referrer_email',
        'client_name', 'client_phone', 'service', 'created_at'
    ]

    fieldsets = (
        ('Referrer', {
            'fields': ('referrer_name', 'referrer_phone', 'referrer_email')
        }),
        ('Client', {
            'fields': ('client_name', 'client_phone', 'service')
        }),
        ('Commission Tracking', {
            'fields': ('status', 'deal_value', 'commission_paid', 'notes')
        }),
        ('Meta', {
            'fields': ('created_at',)
        }),
    )
