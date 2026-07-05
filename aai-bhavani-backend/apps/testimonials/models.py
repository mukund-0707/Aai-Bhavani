from django.db import models


class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    photo       = models.ImageField(upload_to='testimonials/', blank=True)
    rating      = models.PositiveSmallIntegerField(default=5)  # 1-5
    review      = models.TextField()
    location    = models.CharField(max_length=100, blank=True)
    project     = models.CharField(max_length=200, blank=True)
    is_active   = models.BooleanField(default=True)
    order       = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.client_name} ★{self.rating}"
