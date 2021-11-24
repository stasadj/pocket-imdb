from django.urls import path
from src.auths import views as auths_views
from src.movies.views import MovieListAPIView, MovieRetrieveUpdateAPIView, get_genres


urlpatterns = [
    path('api/auth/login', auths_views.login),
    path('api/auth/register', auths_views.register),
    path('api/movies', MovieListAPIView.as_view()),
    path('api/movies/<int:pk>', MovieRetrieveUpdateAPIView.as_view()),
    path('api/genres', get_genres),
]
