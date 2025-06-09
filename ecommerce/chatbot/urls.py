from django.urls import path
from . import views
urlpatterns = [
    # path('chat/', views.ChatbotView.as_view(), name='chat'),
    path('chats/', views.ChatLogListView.as_view(), name='chat-logs'),
    path('chats/create/', views.ChatLogCreateView.as_view(), name='chat-log-create'),
]
