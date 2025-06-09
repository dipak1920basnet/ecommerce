from django.urls import path
from . import views  # Placeholder view

urlpatterns = [
    path('products/', views.ProductListView.as_view(), name='product-list'),
    # You can later add filters: /products/?category=books&min_price=500
]
