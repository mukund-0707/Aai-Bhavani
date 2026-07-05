# Generated manually — adds EmailTemplate and WhatsAppTemplate models

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cms", "0001_initial"),
    ]

    operations = [
        # ── EmailTemplate ──────────────────────────────────────────────────────
        migrations.CreateModel(
            name="EmailTemplate",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=200,
                        help_text="Admin ke liye identifier (e.g., 'Inquiry Notification')",
                    ),
                ),
                (
                    "trigger",
                    models.CharField(
                        max_length=50,
                        unique=True,
                        choices=[
                            ("inquiry_received",  "Inquiry Received (Admin Notification)"),
                            ("referral_received", "Referral Received (Admin Notification)"),
                        ],
                    ),
                ),
                (
                    "subject",
                    models.CharField(
                        max_length=300,
                        help_text="Placeholders use kar sakte hain: {{customer_name}}, {{category}}",
                    ),
                ),
                (
                    "body_text",
                    models.TextField(
                        help_text=(
                            "Plain text email body. "
                            "Placeholders: {{customer_name}}, {{mobile}}, {{category}}, "
                            "{{message}}, {{company_name}}, {{date}}"
                        )
                    ),
                ),
                (
                    "body_html",
                    models.TextField(
                        blank=True,
                        help_text="Optional HTML version. Blank rakho to body_text use hoga.",
                    ),
                ),
                ("is_active",  models.BooleanField(default=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name":        "Email Template",
                "verbose_name_plural": "Email Templates",
            },
        ),

        # ── WhatsAppTemplate ───────────────────────────────────────────────────
        migrations.CreateModel(
            name="WhatsAppTemplate",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        max_length=200,
                        help_text="Admin ke liye identifier",
                    ),
                ),
                (
                    "trigger",
                    models.CharField(
                        max_length=50,
                        unique=True,
                        choices=[
                            ("inquiry_received",  "Inquiry Received (Customer Message)"),
                            ("referral_received", "Referral Received (Referrer Message)"),
                        ],
                    ),
                ),
                (
                    "template_body",
                    models.TextField(
                        help_text=(
                            "WhatsApp message text.\n"
                            "Placeholders: {{customer_name}}, {{mobile}}, {{category}}, "
                            "{{company_name}}, {{date}}"
                        )
                    ),
                ),
                ("is_active",  models.BooleanField(default=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name":        "WhatsApp Template",
                "verbose_name_plural": "WhatsApp Templates",
            },
        ),
    ]
