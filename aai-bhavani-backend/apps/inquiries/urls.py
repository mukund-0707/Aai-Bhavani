from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.inquiries.views import InquiryCategoryViewSet, InquiryViewSet

router = DefaultRouter()
router.register('inquiries/categories', InquiryCategoryViewSet, basename='inquiry-category')
router.register('inquiries',            InquiryViewSet,         basename='inquiry')

urlpatterns = [
    path('', include(router.urls)),
]
