# Generated by Django 5.1.4 on 2025-06-09 04:11

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("price", models.FloatField()),
                ("category", models.CharField(max_length=50)),
                ("stock", models.ImageField(upload_to="")),
                ("image_url", models.URLField()),
            ],
        ),
    ]
