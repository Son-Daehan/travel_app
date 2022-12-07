from django.urls import path 
from . import views


urlpatterns = [
    path('', views.index),

    # BLOG
    # CREATE OR GET ALL BLOGS
    path('api/blogs/', views.blogs),
    # DELETE OR UPDATE BLOG
    path('api/blogs/<int:blog_id>', views.blog),

    # ACCOUNT
    path('api/account/register/', views.signup),
    path('api/account/log_in/', views.log_in),
    path('api/account/log_out/', views.log_out),
    path('api/account/user_profile/', views.user_profile),
]