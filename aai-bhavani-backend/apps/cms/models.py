from django.db import models


# ── Site Settings (Singleton) ─────────────────────────────────────────────────
class SiteSettings(models.Model):
    """Global site config — ek hi row hogi"""
    site_name      = models.CharField(max_length=200, default='Aai Bhavani Consultant')
    site_tagline   = models.CharField(max_length=300, blank=True)
    logo           = models.ImageField(upload_to='site/', blank=True)
    favicon        = models.ImageField(upload_to='site/', blank=True)

    # Contact
    phone          = models.CharField(max_length=20, blank=True)
    whatsapp       = models.CharField(max_length=20, blank=True)
    email          = models.EmailField(blank=True)
    address        = models.TextField(blank=True)
    google_map_url = models.URLField(blank=True)
    working_hours  = models.CharField(max_length=200, blank=True)

    # Social Media
    facebook_url   = models.URLField(blank=True)
    instagram_url  = models.URLField(blank=True)
    linkedin_url   = models.URLField(blank=True)
    youtube_url    = models.URLField(blank=True)
    twitter_url    = models.URLField(blank=True)

    # Theme
    primary_color    = models.CharField(max_length=7, default='#C8973B')
    secondary_color  = models.CharField(max_length=7, default='#1A1A2E')
    background_color = models.CharField(max_length=7, default='#FFFFFF')
    font_family      = models.CharField(max_length=100, default='Inter')
    border_radius    = models.CharField(max_length=20, default='8px')
    animation_speed  = models.CharField(max_length=20, default='0.3s')

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Settings'

    def __str__(self):
        return 'Site Settings'

    def save(self, *args, **kwargs):
        self.pk = 1  # Singleton — always update row #1
        super().save(*args, **kwargs)

    @classmethod
    def get(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


# ── Page Section — Page Builder Core ─────────────────────────────────────────
class PageSection(models.Model):
    """
    Har page ke sections yahan store hote hain.
    Admin drag & drop kare → order update ho → frontend usi order mein render kare.
    """
    class SectionType(models.TextChoices):
        HERO         = 'hero',         'Hero'
        STATS        = 'stats',        'Stats'
        SERVICES     = 'services',     'Services'
        ABOUT        = 'about',        'About Us'
        GALLERY      = 'gallery',      'Gallery'
        TESTIMONIALS = 'testimonials', 'Testimonials'
        TEAM         = 'team',         'Team'
        FAQ          = 'faq',          'FAQ'
        CONTACT      = 'contact',      'Contact'
        REFERRAL     = 'referral',     'Referral Program'

    page         = models.CharField(max_length=100, default='home')
    section_type = models.CharField(max_length=30, choices=SectionType.choices)
    order        = models.PositiveIntegerField(default=0, db_index=True)
    is_visible   = models.BooleanField(default=True)

    # Responsive settings JSON mein — {padding, margin, height, columns, image_size}
    desktop_settings = models.JSONField(default=dict, blank=True)
    tablet_settings  = models.JSONField(default=dict, blank=True)
    mobile_settings  = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ['order']
        unique_together = [['page', 'section_type']]

    def __str__(self):
        return f"{self.page} → {self.section_type} (order: {self.order})"


# ── Hero Section ──────────────────────────────────────────────────────────────
class HeroSection(models.Model):
    title           = models.CharField(max_length=200)
    subtitle        = models.CharField(max_length=300, blank=True)
    description     = models.TextField(blank=True)
    button_text     = models.CharField(max_length=100, blank=True)
    button_link     = models.CharField(max_length=200, blank=True)
    button_2_text   = models.CharField(max_length=100, blank=True)
    button_2_link   = models.CharField(max_length=200, blank=True)
    desktop_image   = models.ImageField(upload_to='hero/', blank=True)
    mobile_image    = models.ImageField(upload_to='hero/', blank=True)
    overlay_opacity = models.FloatField(default=0.5)   # 0.0 - 1.0
    height          = models.CharField(max_length=20, default='100vh')
    is_active       = models.BooleanField(default=True)
    updated_at      = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Hero Section'

    def __str__(self):
        return self.title


# ── Navigation ────────────────────────────────────────────────────────────────
class NavigationItem(models.Model):
    label        = models.CharField(max_length=100)
    link         = models.CharField(max_length=200)
    order        = models.PositiveIntegerField(default=0)
    is_visible   = models.BooleanField(default=True)
    open_new_tab = models.BooleanField(default=False)
    parent       = models.ForeignKey(
        'self', null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='children'
    )

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.label


# ── SEO Settings (Per Page) ───────────────────────────────────────────────────
class SEOSettings(models.Model):
    page             = models.CharField(max_length=100, unique=True)  # 'home', 'about', etc.
    meta_title       = models.CharField(max_length=160)
    meta_description = models.TextField(max_length=320)
    keywords         = models.TextField(blank=True)
    og_image         = models.ImageField(upload_to='seo/', blank=True)
    canonical_url    = models.URLField(blank=True)
    schema_json      = models.JSONField(default=dict, blank=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name     = 'SEO Settings'
        verbose_name_plural = 'SEO Settings'

    def __str__(self):
        return f"SEO: {self.page}"



# ── Email Template ────────────────────────────────────────────────────────────
class EmailTemplate(models.Model):
    """
    Admin se manage hone wale dynamic email templates.
    Inquiry/Referral notifications ke liye hardcoded text ki jagah yahan se content aayega.

    Supported placeholders:
        {{customer_name}}, {{mobile}}, {{email}}, {{category}},
        {{message}}, {{company_name}}, {{date}}
    """

    class Trigger(models.TextChoices):
        INQUIRY_RECEIVED  = 'inquiry_received',  'Inquiry Received (Admin Notification)'
        REFERRAL_RECEIVED = 'referral_received', 'Referral Received (Admin Notification)'

    name       = models.CharField(max_length=200, help_text="Admin ke liye identifier (e.g., 'Inquiry Notification')")
    trigger    = models.CharField(max_length=50, choices=Trigger.choices, unique=True)
    subject    = models.CharField(max_length=300, help_text="Placeholders use kar sakte hain: {{customer_name}}, {{category}}")
    body_text  = models.TextField(help_text="Plain text email body. Placeholders: {{customer_name}}, {{mobile}}, {{category}}, {{message}}, {{company_name}}, {{date}}")
    body_html  = models.TextField(blank=True, help_text="Optional HTML version. Blank rakho to body_text use hoga.")
    is_active  = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Email Template'
        verbose_name_plural = 'Email Templates'

    def __str__(self):
        return f"{self.name} ({self.get_trigger_display()})"


# ── WhatsApp Template ─────────────────────────────────────────────────────────
class WhatsAppTemplate(models.Model):
    """
    Admin se manage hone wale dynamic WhatsApp message templates.
    Inquiry ke baad customer ko message jaata hai.

    Supported placeholders:
        {{customer_name}}, {{mobile}}, {{category}},
        {{company_name}}, {{date}}

    Note: Actual WhatsApp API credentials .env mein store honge.
    Abhi sirf template store ho raha hai — API integration baad mein wire karein.
    """

    class Trigger(models.TextChoices):
        INQUIRY_RECEIVED  = 'inquiry_received',  'Inquiry Received (Customer Message)'
        REFERRAL_RECEIVED = 'referral_received', 'Referral Received (Referrer Message)'

    name          = models.CharField(max_length=200, help_text="Admin ke liye identifier")
    trigger       = models.CharField(max_length=50, choices=Trigger.choices, unique=True)
    template_body = models.TextField(
        help_text=(
            "WhatsApp message text.\n"
            "Placeholders: {{customer_name}}, {{mobile}}, {{category}}, {{company_name}}, {{date}}"
        )
    )
    is_active  = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'WhatsApp Template'
        verbose_name_plural = 'WhatsApp Templates'

    def __str__(self):
        return f"{self.name} ({self.get_trigger_display()})"
