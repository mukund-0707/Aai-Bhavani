from rest_framework import viewsets, permissions
from apps.content.models import Testimonial, TeamMember, FAQ
from apps.content.serializers import (
    TestimonialSerializer, TestimonialAdminSerializer,
    TeamMemberSerializer, TeamMemberAdminSerializer,
    FAQSerializer, FAQAdminSerializer,
)


class ContentViewSet(viewsets.ModelViewSet):
    """Base viewset — public GET (active only), admin full CRUD."""

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return self.queryset_all
        return self.queryset_all.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            return self.admin_serializer_class
        return self.public_serializer_class

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]


class TestimonialViewSet(ContentViewSet):
    queryset_all           = Testimonial.objects.all()
    public_serializer_class = TestimonialSerializer
    admin_serializer_class  = TestimonialAdminSerializer


class TeamMemberViewSet(ContentViewSet):
    queryset_all           = TeamMember.objects.all()
    public_serializer_class = TeamMemberSerializer
    admin_serializer_class  = TeamMemberAdminSerializer


class FAQViewSet(ContentViewSet):
    queryset_all           = FAQ.objects.all()
    public_serializer_class = FAQSerializer
    admin_serializer_class  = FAQAdminSerializer
