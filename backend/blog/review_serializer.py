from rest_framework import serializers
from .models import Review
from .comment_serializer import CommentSerializer

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    comments = CommentSerializer('comments', many=True)

    class Meta:
        model = Review
        fields = ('id', 'title', 'restaurant_name', 'text', 'user', 'comments')