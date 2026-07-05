from django.db import models


class ReferralSubmission(models.Model):
    class Status(models.TextChoices):
        PENDING   = 'pending',   'Pending'
        CONVERTED = 'converted', 'Converted'
        PAID      = 'paid',      'Commission Paid'
        CANCELLED = 'cancelled', 'Cancelled'

    referrer_name   = models.CharField(max_length=100)
    referrer_phone  = models.CharField(max_length=15)
    referrer_email  = models.EmailField(blank=True)
    client_name     = models.CharField(max_length=100)
    client_phone    = models.CharField(max_length=15, blank=True)
    service_type    = models.CharField(max_length=100)
    deal_value      = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    commission_paid = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    status          = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    notes           = models.TextField(blank=True)
    created_at      = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.referrer_name} → {self.client_name} ({self.status})"
