from django.contrib import admin
from apps.content.models import Testimonial, TeamMember, FAQ


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ['client_name', 'rating', 'location', 'is_active', 'order']
    list_filter   = ['is_active', 'rating']
    list_editable = ['is_active', 'order']
    search_fields = ['client_name', 'location']


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display  = ['name', 'designation', 'is_active', 'order']
    list_filter   = ['is_active']
    list_editable = ['is_active', 'order']
    search_fields = ['name', 'designation']


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display  = ['question', 'is_active', 'order']
    list_filter   = ['is_active']
    list_editable = ['is_active', 'order']
    search_fields = ['question']
