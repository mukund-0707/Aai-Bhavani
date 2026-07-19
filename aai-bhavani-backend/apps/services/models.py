from django.db import models


class Service(models.Model):
    # Basic Info
    title             = models.CharField(max_length=200)
    slug              = models.SlugField(unique=True)
    icon              = models.CharField(max_length=100, blank=True, help_text='CSS icon class ya icon name')
    banner_image      = models.ImageField(upload_to='services/banners/', blank=True)
    short_description = models.CharField(max_length=300)
    long_description  = models.TextField(blank=True)
    order             = models.PositiveIntegerField(default=0)
    is_active         = models.BooleanField(default=True)
    created_at        = models.DateTimeField(auto_now_add=True)

    # Referral Settings (inline — alag model nahi)
    is_referral_enabled = models.BooleanField(default=False)
    referral_type       = models.CharField(
        max_length=10,
        choices=[('percent', 'Percentage'), ('flat', 'Flat Amount')],
        default='percent'
    )
    referral_value = models.DecimalField(
        max_digits=10, decimal_places=2, default=50.00,
        help_text='Percentage (e.g. 50) ya flat amount (e.g. 10000)'
    )
    referral_note = models.CharField(
        max_length=200, blank=True,
        help_text='e.g. "Festival Offer", "Limited Time - ends Dec 31"'
    )

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
