from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    profile_img = serializers.ImageField(max_length=None, allow_empty_file=False, allow_null=False, use_url=True, required=False)
    # reviews = ReviewSerializer('reviews', many=True)

    class Meta:
        model = User
        fields = ('email','first_name','last_name', 'profile_img')