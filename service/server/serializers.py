from rest_framework import serializers
from .models import *


class VisitorInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorsInfo
        fields = ('id', 'name', 'phoneNumber', 'email',)


class MessageSerializer(serializers.ModelSerializer):
    visitor_id = serializers.ReadOnlyField(source='visitor.id')

    class Meta:
        model = Message
        fields = ('id', 'date', 'messageContent', 'visitor_id',)


class BlogInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogInfo
        fields = ('id','title', 'intro', 'date', 'content',)


class AccessControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccessControl
        fields = ('date','ip_address',)
