from django.contrib import admin
from apps.properties.models import Property, PropertyImage


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display   = ['title', 'type', 'category', 'city', 'price', 'is_featured', 'is_active']
    list_filter    = ['type', 'category', 'city', 'is_featured', 'is_active']
    list_editable  = ['is_featured', 'is_active']
    search_fields  = ['title', 'city', 'builder_name']
    inlines        = [PropertyImageInline]
