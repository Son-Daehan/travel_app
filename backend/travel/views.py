from django.shortcuts import render
from django.http import JsonResponse, HttpResponse



def index(request):

    homepage = open('static/index.html').read()

    return HttpResponse(homepage)
