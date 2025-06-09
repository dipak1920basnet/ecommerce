from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    category = models.CharField(max_length=50)
    stock = models.IntegerField()
    image_url = models.URLField()

    def __str__(self):
        return f"{self.name} - {self.category}"
    
