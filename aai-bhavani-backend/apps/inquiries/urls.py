from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.inquiries.views import InquiryViewSet, InquiryCategoryViewSet

router = DefaultRouter()
router.register('categories', InquiryCategoryViewSet, basename='inquiry-category')
router.register('',           InquiryViewSet,         basename='inquiry')

urlpatterns = [path('', include(router.urls))]
