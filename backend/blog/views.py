from django.contrib.auth import authenticate, login, logout
from .models import User, Review, Comment, ReviewLike, CommentLike
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from .user_serializer import UserSerializer
from .review_serializer import ReviewSerializer
import requests
from dotenv import load_dotenv
import os
from django.core.files.storage import default_storage
from django.core.validators import validate_email


load_dotenv()
YELP_API_KEY = os.getenv('YELP_API_KEY')

def index(request):

    homepage = open('static/index.html').read()

    return HttpResponse(homepage)


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        body = request.data
        try:
            try:
                validate_email(body['email'])
            except:
                return JsonResponse({'success': False, 'message': 'This email address is not valid.'}, status=422)

            data = {
                'username': body['email'],
                'email': body['email'],
                'password': body['password'],
                'first_name': body['firstName'],
                'last_name': body['lastName'],
            }

            try: 
                User.objects.create_user(**data)
                return JsonResponse({'success':True})

            except:
                return JsonResponse({'status':'false', 'error': 'Something went wrong when signing up.'}, status=422)



        except Exception as e:

            return JsonResponse({'success':False}, status=422)


@api_view(['POST'])
def log_in(request):
    if request.method == 'POST':
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
                        return JsonResponse({'login':False}, status=422)
                else:
                    return JsonResponse({'active':False}, status=422)
                    # Return a 'disabled account' error message
            else:
                return JsonResponse({'user':False}, status=422)
                # Return an 'invalid login' error message.
        except Exception as e:
            return JsonResponse({'success':False, 'error':'Username or password is incorrect.'}, status=422)
        

@api_view(['POST'])
def log_out(request):
    if request.method == 'POST':
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
                return JsonResponse({'user':None}, status=422)
    except Exception as e:

        return JsonResponse({'authenticated':False}, status=422)


@api_view(['POST'])
def image_upload(request):
    if request.method == 'POST':
        try:
            
            file = request.FILES['img']
            username = request.data['username']

            file_name = default_storage.save(f'{username}', file)

            user = User.objects.get(email=username)
            user.profile_img = file_name
            user.save(update_fields=['profile_img'])

            return JsonResponse({'img_url':f'/media/{file_name}/'})

        except Exception as e:

            return JsonResponse({'success':False}, status=422)


@api_view(['PUT'])
def password_change(request):
    if request.method == 'PUT':
        try:
            response = request.data
            user = User.objects.get(email=response['username'])

            user.set_password(response['new_password'])
            user.save()
            return JsonResponse({'success':True})

        except:

            return JsonResponse({'success':False}, status=422)




@api_view(['GET', 'POST'])
def reviews(request):
    if request.method == 'GET':
        reviews = Review.objects.all()

        serialized_reviews = ReviewSerializer(reviews, many=True)

        return JsonResponse({'reviews':serialized_reviews.data[::-1]})

    if request.method == 'POST':
        try:
            response = request.data

            user = User.objects.get(email=response['username'])

            data = {
                'title': response['review_title'],
                'text': response['review'],
                'restaurant_name': response['restaurant_name'],
                'user': user,
            }

            new_review = Review(**data)
            new_review.save()

            return JsonResponse({'success':True})

        except:
            return JsonResponse({'success':False}, status=422)

@api_view(['GET', 'POST'])
def reviews_by_user(request, profile_name):
    if request.method == 'GET':
        try:
            user = User.objects.get(email=profile_name)
            
            reviews = Review.objects.filter(user=user)

            serialized_reviews = ReviewSerializer(reviews, many=True)

            return JsonResponse({'reviews':serialized_reviews.data[::-1]})
        except Exception as e:
            return JsonResponse({'reviews': None}, status=422)


@api_view(['DELETE'])
def review_delete(request):
    if request.method == 'DELETE':
        review_id = request.data['review_id']

        review = Review.objects.get(id=review_id)

        review.delete()

        return JsonResponse({'succes':True})


@api_view(['GET', 'POST'])
def comments(request):

    if request.method == 'POST':
        response = request.data

        user = User.objects.get(email=response['username'])
        review = Review.objects.get(id=response['review_id'])

        data = {
            'text': response['text'],
            'review_id': review,
            'user': user
        }

        new_comment = Comment(**data)
        new_comment.save()

        return JsonResponse({'success':True})


@api_view(['GET', 'POST'])
def review_likes(request):

    if request.method == 'POST':

        response = request.data

        review = Review.objects.get(id=response['review_id'])
        user = User.objects.get(email=response['username'])

        data = {
            'user': user,
            'review_id': review,
        }

        new_review_like = ReviewLike(**data)

        new_review_like.save()
        
        return JsonResponse({'success':True})


@api_view(['DELETE'])
def review_likes_delete(request):

    if request.method == 'DELETE':
        
        try:
            response = request.data

            user = User.objects.get(email=response['username'])
            review_id = request.data['review_id']


            review_like = ReviewLike.objects.get(user=user, review_id=review_id)
            review_like.delete()

            return JsonResponse({'success':True})
        
        except:
            return JsonResponse({'success':False})


@api_view(['GET', 'POST'])
def comment_likes(request):

    if request.method == 'POST':

        response = request.data

        comment = Comment.objects.get(id=response['comment_id'])
        user = User.objects.get(email=response['username'])

        data = {
            'user': user,
            'comment_id': comment,
        }

        new_comment_like = CommentLike(**data)

        new_comment_like.save()
        
        return JsonResponse({'success':True})


@api_view(['DELETE'])
def comment_likes_delete(request):

    if request.method == 'DELETE':
        
        try:
            response = request.data

            user = User.objects.get(email=response['username'])
            comment_id = request.data['comment_id']

            comment_like = CommentLike.objects.get(user=user, comment_id=comment_id)

            comment_like.delete()

            return JsonResponse({'success':True})
        
        except:
            return JsonResponse({'success':False})


@api_view(['GET', 'POST'])
def restaurants(request):
    if request.method == 'POST':

        data = request.data
        lat = data['lat']
        long = data['long']
        search = data['search']

        yelp_api = YELP_API_KEY
        url = "https://api.yelp.com/v3/businesses/search?"

        params = {
            'latitude': lat,
            'longitude': long,
            'limit': 50, # default is 20 // up to 50
            'term': search, # common search terms
            'sort_by': 'distance', # distance, best_match, review_count, rating
        }

        headers = {
            "accept": "application/json",
            'Authorization': yelp_api
            }

        response = requests.get(url, params, headers=headers)
        restaurants = response.json()


        return JsonResponse({'restaurants': restaurants['businesses']})

    
    return JsonResponse({'success':True})


@api_view(['GET'])
def restaurant(request, place_id):
    if request.method == 'GET':

        url = f'https://api.yelp.com/v3/businesses/{place_id}'

        headers = {
            "accept": "application/json",
            "Authorization": YELP_API_KEY
        }


        response = requests.get(url, headers=headers)

        data = response.json()

        return JsonResponse({'restaurant': data})