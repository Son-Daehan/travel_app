from django.urls import path 
from . import views


urlpatterns = [
    path('', views.index),

    # ACCOUNT
    path('api/account/register/', views.signup),
    path('api/account/log_in/', views.log_in),
    path('api/account/log_out/', views.log_out),
    path('api/account/user_profile/', views.user_profile),

    
    # RESTAURANT
    path('api/restaurants/', views.restaurants),
    path('api/restaurants/<str:place_id>/', views.restaurant),


    # REVIEW
    path('api/reviews/', views.reviews),
    path('api/reviews/likes/', views.review_likes),
    path('api/reviews/likes/delete/', views.review_likes_delete),

    # COMMENT
    path('api/comments/', views.comments),
    path('api/comments/likes/', views.comment_likes),
    path('api/comments/likes/delete/', views.comment_likes_delete),

    # LIKE

]