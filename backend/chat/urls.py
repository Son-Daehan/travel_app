from django.urls import path 
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [

    path('chat_log/<str:room_name>', views.manage_chat_log, name="items")
]

urlpatterns = format_suffix_patterns(urlpatterns)