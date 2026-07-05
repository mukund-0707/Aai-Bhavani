from django.db import models


class TeamMember(models.Model):
    photo       = models.ImageField(upload_to='team/')
    name        = models.CharField(max_length=100)
    designation = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    facebook    = models.URLField(blank=True)
    instagram   = models.URLField(blank=True)
    linkedin    = models.URLField(blank=True)
    order       = models.PositiveIntegerField(default=0)
    is_active   = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.name} — {self.designation}"
