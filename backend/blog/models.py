from django.db import models
from django.contrib.auth.models import (AbstractUser)


class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)

    # notice the absence of a "Password field", that is built in.

    # django uses the 'username' to identify users by default, but many modern applications use 'email' instead
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.
    

# not migrated as of yet
class Review(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    restaurant_name = models.CharField(max_length=100)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    review_id = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='comments')


class ReviewLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='review_likes')
    review_id = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='review_likes', blank=True)


class CommentLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment_likes')
    comment_id = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='comment_likes', blank=True)
