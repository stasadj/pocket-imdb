from django.urls import path
from src.auths import views as auths_views
from src.movies import views as movies_views


urlpatterns = [
    path('api/auth/login', auths_views.login),
    path('api/auth/register', auths_views.register),
    path('api/movies', movies_views.MovieListCreateAPIView.as_view()),
    path('api/movies/<int:pk>', movies_views.MovieRetrieveUpdateAPIView.as_view()),
    path('api/movies/<int:pk>/like',
         movies_views.like_movie),
    path('api/movies/<int:pk>/dislike',
         movies_views.dislike_movie),
    path('api/movies/<int:pk>/comment',
         movies_views.add_comment),
    path('api/movies/<int:movie_id>/comments',
         movies_views.CommentListAPIView.as_view()),
    path('api/movies/<int:movie_id>/related',
         movies_views.related),
    path('api/movies/popular', movies_views.popular),
    path('api/genres', movies_views.get_genres),
]
