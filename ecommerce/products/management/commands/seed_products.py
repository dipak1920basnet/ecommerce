from django.core.management.base import BaseCommand
from products.models import Product
from faker import Faker
import random

class Command(BaseCommand):
    help = "Seed database with fake products"

    def handle(self, *args, **kwargs):
        fake = Faker()
        categories = ['books', 'electronics', 'clothing', 'shoes', 'furniture']

        for _ in range(100):
            Product.objects.create(
                name=fake.catch_phrase(),
                description=fake.text(max_nb_chars=200),
                price=round(random.uniform(10, 1000), 2),
                category=random.choice(categories),
                stock=random.randint(1, 100),
                image_url=fake.image_url()
            )

        self.stdout.write(self.style.SUCCESS('✅ Successfully seeded 100+ products.'))
