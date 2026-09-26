from rest_framework import viewsets, permissions
from apps.content.models import Testimonial, TeamMember, FAQ
from apps.content.serializers import (
    TestimonialSerializer, TestimonialAdminSerializer,
    TeamMemberSerializer, TeamMemberAdminSerializer,
    FAQSerializer, FAQAdminSerializer,
)


class ContentViewSet(viewsets.ModelViewSet):
    """Base viewset — public GET (active only), admin full CRUD.

    No Auth mode: AllowAny + admin serializer always.
    When JWT is added: restore is_authenticated checks.
    """

    def get_queryset(self):
        # No Auth mode: return all records so admin can see hidden items too
        # When JWT is added: filter(is_active=True) for unauthenticated
        return self.queryset_all

    def get_serializer_class(self):
        # No Auth mode: always use admin serializer (has all fields)
        # When JWT is added: use public_serializer_class for unauthenticated
        return self.admin_serializer_class

    def get_permissions(self):
        # No Auth mode — AllowAny for all actions
        # When JWT is added: restore IsAuthenticated for write actions
        return [permissions.AllowAny()]


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
