from django.contrib import admin
from apps.gallery.models import GalleryItem


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display  = ['title', 'category', 'media_type', 'is_featured', 'order']
    list_filter   = ['category', 'media_type', 'is_featured']
    list_editable = ['order', 'is_featured']
