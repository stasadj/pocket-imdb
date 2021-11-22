from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .utils import get_tokens_for_user

import json


def login(request):
    user = json.loads(request.body)
    username = user['username']
    password = user['password']
    user = get_object_or_404(User, username=username, password=password)
    tokens = get_tokens_for_user(user)
    return tokens


def register(request):
    user = json.loads(request.body)
    return User.objects.create(username=user['username'], password=user['password'],
                               first_name=user['firstName'], last_name=user['lastName'])
