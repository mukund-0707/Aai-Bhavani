from django.db import models


class Service(models.Model):
    title             = models.CharField(max_length=200)
    slug              = models.SlugField(unique=True)
    short_description = models.CharField(max_length=300)
    long_description  = models.TextField(blank=True)
    icon              = models.CharField(max_length=100, blank=True)  # CSS icon class
    image             = models.ImageField(upload_to='services/', blank=True)
    banner            = models.ImageField(upload_to='services/banners/', blank=True)
    order             = models.PositiveIntegerField(default=0)
    is_active         = models.BooleanField(default=True)
    created_at        = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class ReferralProgram(models.Model):
    """Admin se referral commission % aur info control hoga"""
    title          = models.CharField(max_length=200)
    description    = models.TextField()
    commission_pct = models.DecimalField(max_digits=5, decimal_places=2, default=50.00)
    image          = models.ImageField(upload_to='referral/', blank=True)
    steps          = models.JSONField(default=list, blank=True)  # [{"step":1,"text":"..."}]
    faq            = models.JSONField(default=list, blank=True)  # [{"q":"...","a":"..."}]
    button_text    = models.CharField(max_length=100, default='Join Now')
    button_link    = models.CharField(max_length=200, blank=True)
    is_active      = models.BooleanField(default=True)
    updated_at     = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Referral Program'

    def __str__(self):
        return f"{self.title} ({self.commission_pct}%)"
