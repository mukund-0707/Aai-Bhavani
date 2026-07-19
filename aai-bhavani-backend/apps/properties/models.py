from django.db import models


class Property(models.Model):
    class Type(models.TextChoices):
        SELL = 'sell', 'For Sale'
        RENT = 'rent', 'For Rent'
        BOTH = 'both', 'Sale & Rent'

    class Category(models.TextChoices):
        RESIDENTIAL = 'residential', 'Residential'
        COMMERCIAL  = 'commercial',  'Commercial'
        PLOT        = 'plot',        'Plot'

    title        = models.CharField(max_length=200)
    description  = models.TextField(blank=True)
    type         = models.CharField(max_length=10, choices=Type.choices)
    category     = models.CharField(max_length=20, choices=Category.choices)
    price        = models.DecimalField(max_digits=12, decimal_places=2)
    city         = models.CharField(max_length=100)
    area         = models.CharField(max_length=100, blank=True)
    address      = models.TextField(blank=True)
    builder_name = models.CharField(max_length=150, blank=True)
    amenities    = models.JSONField(default=list, blank=True)  # ["parking","gym"]
    is_featured  = models.BooleanField(default=False)
    is_active    = models.BooleanField(default=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering     = ['-is_featured', '-created_at']
        verbose_name_plural = 'Properties'

    def __str__(self):
        return self.title


class PropertyImage(models.Model):
    property   = models.ForeignKey(Property, related_name='images', on_delete=models.CASCADE)
    image      = models.ImageField(upload_to='properties/')
    alt_text   = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    order      = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.property.title} - image {self.order}"
