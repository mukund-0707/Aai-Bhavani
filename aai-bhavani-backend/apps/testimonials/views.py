from rest_framework import viewsets, permissions
from apps.testimonials.models import Testimonial
from apps.testimonials.serializers import TestimonialSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    serializer_class = TestimonialSerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Testimonial.objects.filter(is_active=True)
        return Testimonial.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
