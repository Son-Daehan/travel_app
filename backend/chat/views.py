# REDIS SETUP
from django.conf import settings
import redis
from rest_framework import status
from rest_framework.response import Response
import json
from rest_framework.decorators import api_view
from django.http import JsonResponse
redis_instance = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)
print(redis_instance)

@api_view(['GET', 'POST'])
def manage_chat_log(request, **data):


    # RETREIVES ALL CHAT LOG FOR A SPECIFIC ROOM
    if request.method == 'GET':
        room_name = data['room_name']
        print('name', room_name)
        response = redis_instance.lrange(room_name, 0, -1)
        print(response)
        # print(request)
        data = []

        for dict in response:
            data.append(json.loads(dict))

        # print(data[::-1])
        #  data is stored 
        return JsonResponse({'data':data[::-1]},status=200)
        
    # ADDS MESSAGE SENT TO THE SPECIFIC ROOM
    elif request.method == 'POST':

        response = request.data

        room_name = response['room_name']
        user = response['user']
        message = response['message']
        print(room_name)
        print(response)

        redis_instance.lpush(room_name, json.dumps({'user':user, 'msg':message}))
        data = {
            'user': user,
            'msg': message
        }

        return JsonResponse(data)




# @api_view(['GET', 'PUT', 'DELETE'])
# def manage_item(request, *args, **kwargs):
#     if request.method == 'GET':
#         if kwargs['key']:
#             value = redis_instance.get(kwargs['key'])
#             if value:
#                 response = {
#                     'key': kwargs['key'],
#                     'value': value,
#                     'msg': 'success'
#                 }
#                 return Response(response, status=200)
#             else:
#                 response = {
#                     'key': kwargs['key'],
#                     'value': None,
#                     'msg': 'Not found'
#                 }
#                 return Response(response, status=404)
#     elif request.method == 'PUT':
#         if kwargs['key']:
#             request_data = json.loads(request.body)
#             new_value = request_data['new_value']
#             value = redis_instance.get(kwargs['key'])
#             if value:
#                 redis_instance.set(kwargs['key'], new_value)
#                 response = {
#                     'key': kwargs['key'],
#                     'value': value,
#                     'msg': f"Successfully updated {kwargs['key']}"
#                 }
#                 return Response(response, status=200)
#             else:
#                 response = {
#                     'key': kwargs['key'],
#                     'value': None,
#                     'msg': 'Not found'
#                 }
#                 return Response(response, status=404)

#     elif request.method == 'DELETE':
#         if kwargs['key']:
#             result = redis_instance.delete(kwargs['key'])
#             if result == 1:
#                 response = {
#                     'msg': f"{kwargs['key']} successfully deleted"
#                 }
#                 return Response(response, status=404)
#             else:
#                 response = {
#                     'key': kwargs['key'],
#                     'value': None,
#                     'msg': 'Not found'
#                 }
#                 return Response(response, status=404)
