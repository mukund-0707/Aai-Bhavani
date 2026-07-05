from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404

from apps.cms.models import (
    SiteSettings, PageSection, HeroSection, NavigationItem, SEOSettings,
    EmailTemplate, WhatsAppTemplate,
)
from apps.cms.serializers import (
    SiteSettingsSerializer, PageSectionSerializer, PageSectionReorderSerializer,
    HeroSectionSerializer, NavigationItemSerializer, SEOSettingsSerializer,
    EmailTemplateSerializer, WhatsAppTemplateSerializer,
)


# ── Dashboard Stats ───────────────────────────────────────────────────────────

class DashboardStatsView(APIView):
    """Admin dashboard ke liye summary stats"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from apps.services.models import Service
        from apps.properties.models import Property
        from apps.gallery.models import GalleryItem
        from apps.inquiries.models import Inquiry
        from apps.referrals.models import ReferralSubmission

        return Response({
            'total_properties':   Property.objects.count(),
            'active_properties':  Property.objects.filter(is_active=True).count(),
            'total_inquiries':    Inquiry.objects.count(),
            'new_inquiries':      Inquiry.objects.filter(status='new').count(),
            'total_referrals':    ReferralSubmission.objects.count(),
            'pending_referrals':  ReferralSubmission.objects.filter(status='pending').count(),
            'gallery_items':      GalleryItem.objects.count(),
            'active_services':    Service.objects.filter(is_active=True).count(),
        })


# ── Public Views ──────────────────────────────────────────────────────────────

class SiteSettingsView(APIView):
    """GET — frontend ke liye global settings"""
    permission_classes = [AllowAny]

    def get(self, request):
        site_settings = SiteSettings.get()
        return Response(SiteSettingsSerializer(site_settings).data)

    def patch(self, request):
        """Admin update"""
        if not request.user.is_authenticated:
            return Response({'error': 'Unauthorized'}, status=401)
        site_settings = SiteSettings.get()
        serializer = SiteSettingsSerializer(site_settings, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class PageLayoutView(APIView):
    """GET ?page=home → section order + visibility"""
    permission_classes = [AllowAny]

    def get(self, request):
        page = request.query_params.get('page', 'home')
        sections = PageSection.objects.filter(page=page)
        return Response(PageSectionSerializer(sections, many=True).data)


class PageLayoutReorderView(APIView):
    """PATCH — Admin drag & drop section reorder"""
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = PageSectionReorderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        for item in serializer.validated_data['sections']:
            PageSection.objects.filter(id=item['id']).update(order=item['order'])

        return Response({'success': True, 'message': 'Layout updated'})


class SectionVisibilityView(APIView):
    """PATCH — Admin section show/hide toggle"""
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        section = get_object_or_404(PageSection, pk=pk)
        section.is_visible = request.data.get('is_visible', section.is_visible)
        section.save()
        return Response(PageSectionSerializer(section).data)


class HeroSectionView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        hero = HeroSection.objects.filter(is_active=True).first()
        if not hero:
            return Response({})
        return Response(HeroSectionSerializer(hero).data)

    def put(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Unauthorized'}, status=401)
        hero, _ = HeroSection.objects.get_or_create(pk=1)
        serializer = HeroSectionSerializer(hero, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class NavigationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Sirf top-level items (parent=None), children nested honge
        items = NavigationItem.objects.filter(is_visible=True, parent=None).order_by('order')
        return Response(NavigationItemSerializer(items, many=True).data)


class SEOView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        page = request.query_params.get('page', 'home')
        seo = get_object_or_404(SEOSettings, page=page)
        return Response(SEOSettingsSerializer(seo).data)


# ── Email Template Views (Admin only) ─────────────────────────────────────────

class EmailTemplateViewSet(viewsets.ModelViewSet):
    """
    Admin se email templates manage karo.
    GET (list) public nahi hai — sirf admin dekhta/edit karta hai.
    """
    serializer_class   = EmailTemplateSerializer
    permission_classes = [IsAuthenticated]
    queryset           = EmailTemplate.objects.all()


# ── WhatsApp Template Views (Admin only) ──────────────────────────────────────

class WhatsAppTemplateViewSet(viewsets.ModelViewSet):
    """
    Admin se WhatsApp message templates manage karo.
    """
    serializer_class   = WhatsAppTemplateSerializer
    permission_classes = [IsAuthenticated]
    queryset           = WhatsAppTemplate.objects.all()
