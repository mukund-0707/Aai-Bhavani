from django.db import models


# ── Inquiry Category ──────────────────────────────────────────────────────────
class InquiryCategory(models.Model):
    """
    Service ke andar ki sub-categories.
    Example:
        Service: Property Consulting → Buy Property, Sell Property, Rent
        Service: Home Loan          → New Loan, Balance Transfer
        Service: Interior Design    → (koi category nahi — direct inquiry)
    """
    service   = models.ForeignKey(
        'services.Service',
        on_delete=models.CASCADE,
        related_name='inquiry_categories'
    )
    name      = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    order     = models.PositiveIntegerField(default=0)

    class Meta:
        ordering            = ['order', 'name']
        verbose_name        = 'Inquiry Category'
        verbose_name_plural = 'Inquiry Categories'

    def __str__(self):
        return f"{self.service.title} → {self.name}"


# ── Inquiry ───────────────────────────────────────────────────────────────────
class Inquiry(models.Model):

    class Status(models.TextChoices):
        NEW         = 'new',         'New'
        CONTACTED   = 'contacted',   'Contacted'
        IN_PROGRESS = 'in_progress', 'In Progress'
        CLOSED      = 'closed',      'Closed'

    # Service mandatory in form, optional in DB (SET_NULL agar service delete ho)
    service  = models.ForeignKey(
        'services.Service',
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='inquiries'
    )
    # Category optional — sirf tab hoga jab service mein categories hon
    category = models.ForeignKey(
        InquiryCategory,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='inquiries'
    )

    name    = models.CharField(max_length=100)
    phone   = models.CharField(max_length=15)
    email   = models.EmailField(blank=True)
    message = models.TextField(blank=True)

    status     = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    notes      = models.TextField(blank=True, help_text='Admin internal notes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering            = ['-created_at']
        verbose_name_plural = 'Inquiries'

    def __str__(self):
        service_name  = self.service.title   if self.service  else 'General'
        category_name = self.category.name   if self.category else ''
        label = f"{service_name} — {category_name}" if category_name else service_name
        return f"{self.name} | {label} ({self.status})"
