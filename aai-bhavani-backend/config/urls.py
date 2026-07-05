from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from apps.services.views import ReferralProgramView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth
    path('api/auth/',        include('apps.accounts.urls')),

    # CMS (page builder, hero, nav, seo, theme, dashboard)
    path('api/cms/',         include('apps.cms.urls')),

    # Business — Public read + Admin write
    path('api/services/',    include('apps.services.urls')),
    path('api/properties/',  include('apps.properties.urls')),
    path('api/gallery/',     include('apps.gallery.urls')),
    path('api/testimonials/',include('apps.testimonials.urls')),
    path('api/team/',        include('apps.team.urls')),
    path('api/faqs/',        include('apps.faqs.urls')),

    # Public POST only
    path('api/inquiries/',   include('apps.inquiries.urls')),
    path('api/referrals/',   include('apps.referrals.urls')),

    # Referral Program info (public GET)
    path('api/referral-program/', ReferralProgramView.as_view(), name='referral-program'),
]

# Dev mein media files serve karo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
