from django.db import models


class GalleryItem(models.Model):
    class Category(models.TextChoices):
        PROPERTY = 'property', 'Property'
        INTERIOR = 'interior', 'Interior'
        OFFICE   = 'office',   'Office'
        EVENTS   = 'events',   'Events'

    class MediaType(models.TextChoices):
        IMAGE   = 'image',   'Image'
        YOUTUBE = 'youtube', 'YouTube'
        REEL    = 'reel',    'Instagram Reel'

    title      = models.CharField(max_length=200, blank=True)
    media_type = models.CharField(max_length=10, choices=MediaType.choices, default=MediaType.IMAGE)
    image      = models.ImageField(upload_to='gallery/', blank=True)
    video_url  = models.URLField(blank=True)
    alt_text   = models.CharField(max_length=200, blank=True)
    category   = models.CharField(max_length=20, choices=Category.choices)
    is_featured= models.BooleanField(default=False)
    order      = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title or f"{self.category} - {self.pk}"
