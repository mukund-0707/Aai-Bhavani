from rest_framework import viewsets, permissions
from apps.faqs.models import FAQ
from apps.faqs.serializers import FAQSerializer
from django_filters.rest_framework import DjangoFilterBackend

class FAQViewSet(viewsets.ModelViewSet):
    serializer_class = FAQSerializer
    filter_backends  = [DjangoFilterBackend]
    filterset_fields = ['category', 'is_active']

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return FAQ.objects.filter(is_active=True)
        return FAQ.objects.all()

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
