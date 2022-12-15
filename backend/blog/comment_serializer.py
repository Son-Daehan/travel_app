from rest_framework import serializers
from .models import Comment
from .comment_likes_serializer import CommentLikeSerializer

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    comment_likes = CommentLikeSerializer('comment_likes', many=True)

    class Meta:
        model = Comment
        fields = ('id', 'text', 'user', 'comment_likes')