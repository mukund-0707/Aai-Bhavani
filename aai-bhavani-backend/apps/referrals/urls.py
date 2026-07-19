from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.referrals.views import ReferralSubmissionViewSet

router = DefaultRouter()
router.register('referrals', ReferralSubmissionViewSet, basename='referral')

urlpatterns = [
    path('', include(router.urls)),
]
