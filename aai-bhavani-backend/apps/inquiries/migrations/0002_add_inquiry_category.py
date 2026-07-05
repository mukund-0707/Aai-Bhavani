# Generated manually — adds InquiryCategory model and updates Inquiry model

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("inquiries", "0001_initial"),
    ]

    operations = [
        # 1. InquiryCategory table create karo
        migrations.CreateModel(
            name="InquiryCategory",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                ("slug", models.SlugField(blank=True, max_length=100, unique=True)),
                ("is_active", models.BooleanField(default=True)),
                ("order", models.PositiveIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Inquiry Category",
                "verbose_name_plural": "Inquiry Categories",
                "ordering": ["order", "name"],
            },
        ),

        # 2. Inquiry.service_type ke choices + default remove karo (blank field ban jaayega)
        migrations.AlterField(
            model_name="inquiry",
            name="service_type",
            field=models.CharField(max_length=20, blank=True, default=""),
        ),

        # 3. Inquiry mein category FK add karo (nullable — existing rows NULL rahenge)
        migrations.AddField(
            model_name="inquiry",
            name="category",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="inquiries",
                to="inquiries.inquirycategory",
            ),
        ),
    ]
