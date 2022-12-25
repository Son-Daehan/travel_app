from rest_framework import serializers
from .models import Review
from .comment_serializer import CommentSerializer
from .review_likes_serializer import ReviewLikeSerializer
from .user_serializer import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer('user')
    comments = CommentSerializer('comments', many=True)
    review_likes = ReviewLikeSerializer('review_likes', many=True)

    class Meta:
        model = Review
        fields = ('id', 'title', 'restaurant_name', 'text', 'user', 'comments', 'review_likes')