from django.contrib import admin
from apps.faqs.models import FAQ

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display  = ['question', 'category', 'sort_order', 'is_active']
    list_editable = ['sort_order', 'is_active']
    list_filter   = ['category', 'is_active']
