from django.db import models


# ── Site Settings (Singleton) ─────────────────────────────────────────────────
class SiteSettings(models.Model):
    """
    Global site config — ek hi row hogi (pk=1).
    Admin se logo, contact, social links, aur hero content manage hoga.
    """

    # Brand
    site_name    = models.CharField(max_length=200, default='Aai Bhavani Consultant')
    site_tagline = models.CharField(max_length=300, blank=True)
    logo         = models.ImageField(upload_to='site/', blank=True)
    favicon      = models.ImageField(upload_to='site/', blank=True)

    # Contact
    phone          = models.CharField(max_length=20, blank=True)
    whatsapp       = models.CharField(max_length=20, blank=True)
    email          = models.EmailField(blank=True)
    address        = models.TextField(blank=True)
    google_map_url = models.URLField(blank=True)
    working_hours  = models.CharField(max_length=200, blank=True)

    # Social Media
    facebook_url  = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    linkedin_url  = models.URLField(blank=True)
    youtube_url   = models.URLField(blank=True)

    # Hero Section (merged here — site-level config hai)
    hero_title       = models.CharField(max_length=200, blank=True)
    hero_subtitle    = models.CharField(max_length=300, blank=True)
    hero_description = models.TextField(blank=True)
    hero_image       = models.ImageField(upload_to='hero/', blank=True)
    hero_button_text = models.CharField(max_length=100, blank=True)
    hero_button_link = models.CharField(max_length=200, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return 'Site Settings'

    def save(self, *args, **kwargs):
        # Singleton — always update row #1
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def get(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


# ── Email Template ────────────────────────────────────────────────────────────
class EmailTemplate(models.Model):
    """
    Admin se manage hone wale dynamic email templates.
    Aai Bhavani Gmail se bheje jaate hain.

    Placeholders:
        {{customer_name}}, {{mobile}}, {{email}}, {{service}},
        {{category}}, {{message}}, {{company_name}},
        {{whatsapp_number}}, {{date}}
    """

    class Trigger(models.TextChoices):
        INQUIRY_CUSTOMER_CONFIRMATION  = 'inquiry_customer_confirmation',  'Inquiry — User ko Confirmation'
        INQUIRY_ADMIN_NOTIFICATION     = 'inquiry_admin_notification',     'Inquiry — Admin ko Notification'
        REFERRAL_CUSTOMER_CONFIRMATION = 'referral_customer_confirmation', 'Referral — Referrer ko Confirmation'
        REFERRAL_ADMIN_NOTIFICATION    = 'referral_admin_notification',    'Referral — Admin ko Notification'

    name       = models.CharField(max_length=200)
    trigger    = models.CharField(max_length=50, choices=Trigger.choices, unique=True)
    subject    = models.CharField(max_length=300)
    body_text  = models.TextField()
    body_html  = models.TextField(blank=True, help_text='Optional HTML version. Blank rakho to body_text use hoga.')
    is_active  = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = 'Email Template'
        verbose_name_plural = 'Email Templates'

    def __str__(self):
        return f"{self.name} ({self.get_trigger_display()})"


# ── WhatsApp Template ─────────────────────────────────────────────────────────
class WhatsAppTemplate(models.Model):
    """
    Admin se manage hone wale WhatsApp message templates.
    Development: wa.me URL generate karta hai (free, no API).
    Production: WHATSAPP_BACKEND setting se switch hoga.

    Placeholders:
        {{customer_name}}, {{mobile}}, {{service}},
        {{category}}, {{company_name}}, {{whatsapp_number}}, {{date}}
    """

    class Trigger(models.TextChoices):
        INQUIRY_CUSTOMER_CONFIRMATION  = 'inquiry_customer_confirmation',  'Inquiry — User ko Confirmation'
        INQUIRY_ADMIN_NOTIFICATION     = 'inquiry_admin_notification',     'Inquiry — Admin ko Notification'
        REFERRAL_CUSTOMER_CONFIRMATION = 'referral_customer_confirmation', 'Referral — Referrer ko Confirmation'
        REFERRAL_ADMIN_NOTIFICATION    = 'referral_admin_notification',    'Referral — Admin ko Notification'

    name          = models.CharField(max_length=200)
    trigger       = models.CharField(max_length=50, choices=Trigger.choices, unique=True)
    template_body = models.TextField()
    is_active     = models.BooleanField(default=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = 'WhatsApp Template'
        verbose_name_plural = 'WhatsApp Templates'

    def __str__(self):
        return f"{self.name} ({self.get_trigger_display()})"
