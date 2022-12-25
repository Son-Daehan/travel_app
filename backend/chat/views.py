# REDIS SETUP
from django.conf import settings
import redis
from rest_framework import status
from rest_framework.response import Response
import json
from rest_framework.decorators import api_view
from django.http import JsonResponse
redis_instance = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)

@api_view(['GET', 'POST'])
def manage_chat_log(request, **data):


    if request.method == 'GET':
        room_name = data['room_name']
        response = redis_instance.lrange(room_name, 0, 10)
        data = []

        for dict in response:
            data.append(json.loads(dict))

        data.append({'user':'Chat Bot', 'msg':f'Welcome to the {room_name} chat room!'})


        return JsonResponse({'data':data[::-1]},status=200)
        
    elif request.method == 'POST':

        response = request.data

        room_name = response['room_name']
        user = response['user']
        message = response['message']

        redis_instance.lpush(room_name, json.dumps({'user':user, 'msg':message}))
        data = {
            'user': user,
            'msg': message
        }

        return JsonResponse(data)

