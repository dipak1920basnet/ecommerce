# users/urls.py
from django.urls import path
from . import views   # placeholder
from .views import ProtectedTestView

urlpatterns = [
    path('register/', views.RegisterView.as_view()),
    path('login/',    views.LoginView.as_view()),
    path('protected/', ProtectedTestView.as_view(), name='protected'),

]
