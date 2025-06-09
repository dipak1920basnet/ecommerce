from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import ChatLog
from .serializers import ChatLogSerializer


class ChatLogListView(generics.ListAPIView):
    serializer_class = ChatLogSerializer
    permission_classes = [permissions.IsAuthenticated]  # Ensure only authenticated users can access this view

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return ChatLog.objects.filter(user=user).order_by('-timestamp')
        return ChatLog.objects.none()  # Return an empty queryset for unauthenticated users

class ChatLogCreateView(generics.CreateAPIView):
    serializer_class = ChatLogSerializer
    permission_classes = [permissions.IsAuthenticated]  # Ensure only authenticated users can create chat logs

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  # Automatically set the user to the currently authenticated user

        