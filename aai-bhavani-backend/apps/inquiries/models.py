from django.db import models
from django.utils.text import slugify


# ── Inquiry Category (Dynamic) ────────────────────────────────────────────────
class InquiryCategory(models.Model):
    """
    Admin se manage hone wali dynamic inquiry categories.
    Code change kiye bina naye categories add ho sakti hain.
    Examples: Buy Property, Sell Property, Home Loan, Interior Design
    """
    name       = models.CharField(max_length=100, unique=True)
    slug       = models.SlugField(max_length=100, unique=True, blank=True)
    is_active  = models.BooleanField(default=True)
    order      = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering        = ['order', 'name']
        verbose_name    = 'Inquiry Category'
        verbose_name_plural = 'Inquiry Categories'

    def save(self, *args, **kwargs):
        # slug auto-generate karo agar blank hai
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


# ── Inquiry ───────────────────────────────────────────────────────────────────
class Inquiry(models.Model):

    class Status(models.TextChoices):
        NEW         = 'new',         'New'
        CONTACTED   = 'contacted',   'Contacted'
        IN_PROGRESS = 'in_progress', 'In Progress'
        CLOSED      = 'closed',      'Closed'

    name     = models.CharField(max_length=100)
    phone    = models.CharField(max_length=15)
    email    = models.EmailField(blank=True)
    message  = models.TextField(blank=True)

    # Dynamic category (FK) — replaces old hardcoded service_type
    # SET_NULL: category delete ho jaaye to inquiry orphan na ho, sirf NULL ho jaaye
    category = models.ForeignKey(
        InquiryCategory,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='inquiries'
    )

    # Legacy field — migration ke baad remove kar sakte hain (abhi rakhna safe hai)
    service_type = models.CharField(max_length=20, blank=True, default='')

    property     = models.ForeignKey(
        'properties.Property',
        null=True, blank=True,
        on_delete=models.SET_NULL
    )
    status   = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    source   = models.CharField(max_length=50, default='website')
    notes    = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering            = ['-created_at']
        verbose_name_plural = 'Inquiries'

    def __str__(self):
        category_name = self.category.name if self.category else self.service_type or 'General'
        return f"{self.name} — {category_name} ({self.status})"
