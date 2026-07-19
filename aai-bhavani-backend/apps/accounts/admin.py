from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from apps.accounts.models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'is_staff', 'is_active']
    list_filter  = ['is_staff', 'is_active']
    fieldsets    = UserAdmin.fieldsets + (
        ('Contact', {'fields': ('phone',)}),
    )
