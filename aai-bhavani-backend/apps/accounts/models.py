from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom User — sirf admin/staff ke liye.
    is_staff=True  → admin panel access + notifications milti hain
    is_staff=False → regular user (future use)
    """
    phone      = models.CharField(max_length=15, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username
