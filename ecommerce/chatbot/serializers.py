from rest_framework import serializers
from .models import ChatLog

class ChatLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatLog
        fields = '__all__'
        read_only_fields = ['user','timestamp']

        