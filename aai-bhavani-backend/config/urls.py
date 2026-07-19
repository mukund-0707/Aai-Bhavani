from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Auth
    path('api/auth/', include('apps.accounts.urls')),

    # Core — site settings, email/whatsapp templates
    path('api/', include('apps.core.urls')),

    # Business
    path('api/', include('apps.services.urls')),
    path('api/', include('apps.properties.urls')),

    # Inquiries & Referrals
    path('api/', include('apps.inquiries.urls')),
    path('api/', include('apps.referrals.urls')),

    # Content — testimonials, team, faqs
    path('api/', include('apps.content.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
