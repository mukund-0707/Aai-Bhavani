from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.content.views import TestimonialViewSet, TeamMemberViewSet, FAQViewSet

router = DefaultRouter()
router.register('testimonials', TestimonialViewSet, basename='testimonial')
router.register('team',         TeamMemberViewSet,  basename='team')
router.register('faqs',         FAQViewSet,         basename='faq')

urlpatterns = [
    path('', include(router.urls)),
]
