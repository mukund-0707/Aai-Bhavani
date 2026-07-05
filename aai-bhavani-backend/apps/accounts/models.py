from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom User — sirf admin/staff ke liye"""

    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        STAFF = 'staff', 'Staff'

    role       = models.CharField(max_length=10, choices=Role.choices, default=Role.ADMIN)
    phone      = models.CharField(max_length=15, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
