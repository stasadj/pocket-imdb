from django.db import models
from src.users.models import User

import json


GENRE_CHOICES = [
    (1, 'Fantasy'),
    (2, 'Action'),
    (3, 'Adventure'),
    (4, 'Drama'),
    (5, 'Horror'),
    (6, 'Sci-Fi'),
    (7, 'Thriller'),
    (8, 'Biography'),
    (9, 'Comedy'),
    (10, 'Crime'),
    (11, 'History'),
]


class Movie(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=500, blank=False)
    cover = models.CharField(max_length=500, blank=False)
    genre = models.CharField(
        max_length=15,
        choices=GENRE_CHOICES,
        blank=True
    )
    views = models.PositiveBigIntegerField(default=0)
    likes = models.ManyToManyField(User, related_name='movies_liked')
    dislikes = models.ManyToManyField(User, related_name='movies_disliked')

    @classmethod
    def get_queryset(cls, request):
        queryset = cls.objects.all()
        title = request.query_params.get('title')
        genre = request.query_params.get('genre')
        if title is not None:
            queryset = queryset.filter(
                title__icontains=title, genre__icontains=genre)
        return queryset

    @classmethod
    def popular(cls):
        return cls.objects.all().annotate(likes_count=models.Count(
            'likes')).order_by('-likes_count')[:10]

    @classmethod
    def create(cls, request):
        movie = json.loads(request.body)
        return cls.objects.create(title=movie['title'], description=movie['description'], cover=movie['cover'], genre=movie['genre'])

    @classmethod
    def related(cls, movie_id):
        movie = cls.objects.get(id=movie_id)
        return cls.objects.filter(genre=movie.genre).exclude(id=movie_id)[:10]

    @classmethod
    def increment_views(cls, pk):
        movie = cls.objects.get(id=pk)
        movie.views += 1
        movie.save()
        return movie

    @classmethod
    def like_movie(cls, user, pk):
        movie = cls.objects.get(id=pk)
        if movie.likes.filter(id=user.id).exists():
            movie.likes.remove(user)
        else:
            if movie.dislikes.filter(id=user.id).exists():
                movie.dislikes.remove(user)
            movie.likes.add(user)
        return movie

    @classmethod
    def dislike_movie(cls, user, pk):
        movie = cls.objects.get(id=pk)
        if movie.dislikes.filter(id=user.id).exists():
            movie.dislikes.remove(user)
        else:
            if movie.likes.filter(id=user.id).exists():
                movie.likes.remove(user)
            movie.dislikes.add(user)
        return movie


class Comment(models.Model):
    content = models.CharField(max_length=500, blank=False)
    user = models.ForeignKey(
        User, related_name='comments', on_delete=models.CASCADE)
    movie = models.ForeignKey(
        Movie, related_name='comments', on_delete=models.CASCADE)

    @classmethod
    def get_queryset(cls, movie_id):
        queryset = cls.objects.all()
        if movie_id is not None:
            queryset = queryset.filter(
                movie__id=movie_id)
        return queryset

    @classmethod
    def add_comment(cls, request, pk):
        user = request.user
        movie = Movie.objects.get(id=pk)
        content = json.loads(request.body)['content']
        return cls.objects.create(user=user, movie=movie, content=content)
