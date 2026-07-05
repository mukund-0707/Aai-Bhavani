from django.contrib import admin
from apps.team.models import TeamMember

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display  = ['name', 'designation', 'order', 'is_active']
    list_editable = ['order', 'is_active']
