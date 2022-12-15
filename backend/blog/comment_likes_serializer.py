from rest_framework import serializers
from .models import CommentLike

class CommentLikeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = CommentLike
        fields = ('comment_id', 'user')