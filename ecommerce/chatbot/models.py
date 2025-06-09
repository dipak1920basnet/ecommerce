from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from products.models import Product
from django.utils import timezone

class ChatLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    query = models.TextField()
    response = models.JSONField() #Store the returned product list
    timestamp = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return f"{self.user.username} - {self.query}"
    


