from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.cms import views

router = DefaultRouter()
router.register('email-templates',    views.EmailTemplateViewSet,    basename='email-template')
router.register('whatsapp-templates', views.WhatsAppTemplateViewSet, basename='whatsapp-template')

urlpatterns = [
    # Public
    path('site-settings/',       views.SiteSettingsView.as_view(),       name='site-settings'),
    path('page-layout/',         views.PageLayoutView.as_view(),         name='page-layout'),
    path('hero/',                views.HeroSectionView.as_view(),        name='hero'),
    path('navigation/',          views.NavigationView.as_view(),         name='navigation'),
    path('seo/',                 views.SEOView.as_view(),                name='seo'),

    # Admin only
    path('page-layout/reorder/', views.PageLayoutReorderView.as_view(),  name='page-layout-reorder'),
    path('sections/<int:pk>/',   views.SectionVisibilityView.as_view(),  name='section-visibility'),
    path('dashboard/stats/',     views.DashboardStatsView.as_view(),     name='dashboard-stats'),

    # Admin — Template management
    path('', include(router.urls)),
]
