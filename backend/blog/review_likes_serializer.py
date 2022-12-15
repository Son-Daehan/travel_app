from rest_framework import serializers
from .models import ReviewLike

class ReviewLikeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = ReviewLike
        fields = ('review_id', 'user')