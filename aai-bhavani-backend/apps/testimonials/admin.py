from django.contrib import admin
from apps.testimonials.models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ['client_name', 'rating', 'location', 'order', 'is_active']
    list_editable = ['order', 'is_active']
