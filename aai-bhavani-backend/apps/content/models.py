from django.db import models


class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    photo       = models.ImageField(upload_to='testimonials/', blank=True)
    rating      = models.PositiveSmallIntegerField(default=5)  # 1-5
    review      = models.TextField()
    location    = models.CharField(max_length=100, blank=True)
    is_active   = models.BooleanField(default=True)
    order       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.client_name} ★{self.rating}"


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


class FAQ(models.Model):
    question  = models.CharField(max_length=300)
    answer    = models.TextField()
    order     = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering     = ['order']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question[:80]
