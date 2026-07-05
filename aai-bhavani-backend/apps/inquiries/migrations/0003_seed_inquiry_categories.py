# Data migration — existing service_type values se default InquiryCategory rows banao
# Aur existing Inquiry records ko naye categories se link karo

from django.db import migrations


# Default categories jo hamesha honge (service_type mapping + new ones)
DEFAULT_CATEGORIES = [
    {"name": "Buy Property",      "slug": "buy-property",      "order": 1},
    {"name": "Sell Property",     "slug": "sell-property",     "order": 2},
    {"name": "Rent Property",     "slug": "rent-property",     "order": 3},
    {"name": "Home Loan",         "slug": "home-loan",         "order": 4},
    {"name": "Personal Loan",     "slug": "personal-loan",     "order": 5},
    {"name": "Interior Design",   "slug": "interior-design",   "order": 6},
    {"name": "Digital Marketing", "slug": "digital-marketing", "order": 7},
    {"name": "Referral",          "slug": "referral",          "order": 8},
    {"name": "General Inquiry",   "slug": "general-inquiry",   "order": 9},
]

# Old service_type string → new category slug mapping
SERVICE_TYPE_SLUG_MAP = {
    "property": "buy-property",
    "interior": "interior-design",
    "digital":  "digital-marketing",
    "referral": "referral",
    "general":  "general-inquiry",
}


def seed_categories_and_link(apps, schema_editor):
    InquiryCategory = apps.get_model("inquiries", "InquiryCategory")
    Inquiry         = apps.get_model("inquiries", "Inquiry")

    # 1. Default categories create karo
    for cat_data in DEFAULT_CATEGORIES:
        InquiryCategory.objects.get_or_create(
            slug=cat_data["slug"],
            defaults={
                "name":      cat_data["name"],
                "order":     cat_data["order"],
                "is_active": True,
            }
        )

    # 2. Existing inquiry records ko match karo
    for inquiry in Inquiry.objects.all():
        if inquiry.service_type:
            target_slug = SERVICE_TYPE_SLUG_MAP.get(inquiry.service_type, "general-inquiry")
            try:
                category = InquiryCategory.objects.get(slug=target_slug)
                inquiry.category = category
                inquiry.save(update_fields=["category"])
            except InquiryCategory.DoesNotExist:
                pass  # edge case — skip silently


def reverse_migration(apps, schema_editor):
    # Reverse: category FK NULL karo (categories delete nahi karte — safe)
    Inquiry = apps.get_model("inquiries", "Inquiry")
    Inquiry.objects.all().update(category=None)


class Migration(migrations.Migration):

    dependencies = [
        ("inquiries", "0002_add_inquiry_category"),
    ]

    operations = [
        migrations.RunPython(
            seed_categories_and_link,
            reverse_code=reverse_migration,
        ),
    ]
