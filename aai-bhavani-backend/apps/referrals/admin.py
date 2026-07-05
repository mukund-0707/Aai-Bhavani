from django.contrib import admin
from apps.referrals.models import ReferralSubmission


@admin.register(ReferralSubmission)
class ReferralSubmissionAdmin(admin.ModelAdmin):
    list_display  = ['referrer_name', 'client_name', 'service_type', 'deal_value', 'commission_paid', 'status', 'created_at']
    list_filter   = ['status', 'service_type']
    list_editable = ['status']
    search_fields = ['referrer_name', 'client_name', 'referrer_phone']
    readonly_fields = ['created_at']
