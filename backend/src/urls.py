from django.urls import path
from src.auths import views as auths_views
from src.movies.views import MovieAPIView


urlpatterns = [
    path('api/auth/login', auths_views.login),
    path('api/auth/register', auths_views.register),
    path('api/movies', MovieAPIView.as_view()),
]
