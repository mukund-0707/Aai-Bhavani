from django.db import models


class FAQ(models.Model):
    question   = models.CharField(max_length=300)
    answer     = models.TextField()
    category   = models.CharField(max_length=100, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    is_active  = models.BooleanField(default=True)

    class Meta:
        ordering  = ['sort_order']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question[:80]
