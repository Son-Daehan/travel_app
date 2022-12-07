from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from .models import User, Blog
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .user_serializer import UserSerializer
from .blog_serializer import BlogSerializer

def index(request):

    homepage = open('static/index.html').read()

    return HttpResponse(homepage)


@api_view(['POST'])
def signup(request):
    try:
        body = request.data
        print(body)
        data = {
            'username': body['email'],
            'email': body['email'],
            'password': body['password'],
            'first_name': body['firstName'],
            'last_name': body['lastName'],
        }

        try: 
            User.objects.create_user(**data)

        except:
            return JsonResponse({'status':'false', 'message': 'there is def something wrong'}, status=403)


        return JsonResponse({'success':True})

    except Exception as e:

        return JsonResponse({'success':False})


@api_view(['POST'])
def log_in(request):
    try:
        body = request.data
        username = body['username']
        password = body['password']

        user = authenticate(username=username, password=password)


        if user is not None:
            if user.is_active:
                try:
                    login(request, user)

                    serializedUser = UserSerializer(user)
                    return JsonResponse({'user_info': serializedUser.data})
                except Exception as e:
                    # print('oops!')
                    # print(str(e))
                    return JsonResponse({'login':False}, status=401)
                # Redirect to a success page.
            else:
                return JsonResponse({'active':False}, status=401)
                # Return a 'disabled account' error message
        else:
            return JsonResponse({'user':False}, status=401)
            # Return an 'invalid login' error message.
    except Exception as e:
        print(e)
        return JsonResponse({'success':False}, status=401)
        

@api_view(['POST'])
def log_out(request):
    print(request)
    logout(request)
    return JsonResponse({'success':True})


@api_view(['GET'])
def user_profile(request):
    # return HttpResponse({request})
    try:
        if request.user:
            if request.user.is_authenticated:
                return JsonResponse({
                    'email': request.user.email,
                    'first_name': request.user.first_name
                })
            else:
                return JsonResponse({'user':None})
    except Exception as e:
        print(e)

        return JsonResponse({'authenticated':False})


@api_view(['GET', 'POST'])
def blogs(request):
    if request.method == 'GET':
        try:
            blogs = Blog.objects.all()
            print(blogs)
            
            serialized_data = BlogSerializer(blogs, many=True)

            return JsonResponse({'blogs': serialized_data.data})

        except Exception as e:
            return JsonResponse({'success': False}, status=400)

    if request.method == 'POST':
        response = request.data

        data = {
            'title': response['title'],
            'category': response['category'],
            'description': response['description'],
            'text': response['text'],
            'user': request.user,
        }

        new_blog = Blog(**data)
        new_blog.save()

        return JsonResponse({'success': True})
        

@api_view(['GET', 'PUT', 'DELETE'])
def blog(request, blog_id):
    blog = Blog.objects.get(id=blog_id)

    if request.method == 'GET':

        blog_serialized = BlogSerializer(blog)
        print(blog_serialized.data)
        return JsonResponse({'blog': blog_serialized.data})

    if request.method == 'PUT':
        pass

    if request.method == 'DELETE':
        try:
            blog.delete()
            return JsonResponse({'success': True})
        
        except Exception as e:
            return JsonResponse({'error': e})