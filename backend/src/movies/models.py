from django.db import models
from easy_thumbnails.fields import ThumbnailerImageField
from src.users.models import User
from .services import send_mail_to_admin

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


class CoverImages(models.Model):
    thumbnail = ThumbnailerImageField(
        upload_to='static/thumbnails/', blank=True, null=True, resize_source=dict(size=(200, 200)))
    full_size = ThumbnailerImageField(
        upload_to='static/full-size/', blank=True, null=True, resize_source=dict(size=(400, 400)))


class Movie(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=500, blank=False)
    genre = models.CharField(
        max_length=15,
        choices=GENRE_CHOICES,
        blank=True
    )
    views = models.PositiveBigIntegerField(default=0)
    likes = models.ManyToManyField(User, related_name='movies_liked')
    dislikes = models.ManyToManyField(User, related_name='movies_disliked')
    images = models.OneToOneField(
        CoverImages,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

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
    def create(cls, request):
        movie = request.POST
        cover = request.FILES.get('cover')
        images = CoverImages.objects.create(
            thumbnail=cover, full_size=cover)
        new_movie = cls.objects.create(
            title=movie['title'], description=movie['description'], genre=movie['genre'], images=images)
        send_mail_to_admin(new_movie)
        return new_movie

    @classmethod
    def popular(cls):
        return cls.objects.all().annotate(likes_count=models.Count(
            'likes')).order_by('-likes_count')[:10]

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

    @classmethod
    def watch_list(cls, request):
        user = request.user
        return cls.objects.filter(watch_list_items__user=user)


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


class WatchListItem(models.Model):
    watched = models.BooleanField(default=False)
    user = models.ForeignKey(
        User, related_name='watch_list_items', on_delete=models.CASCADE)
    movie = models.ForeignKey(
        Movie, related_name='watch_list_items', on_delete=models.CASCADE)

    @classmethod
    def add_remove(cls, user, movie_id):
        movie = Movie.objects.get(id=movie_id)
        item = cls.objects.filter(user=user, movie=movie)
        if item.exists():
            item.delete()
        else:
            cls.objects.create(user=user, movie=movie)
        return movie

    @classmethod
    def set_watched(cls, user, movie_id):
        movie = Movie.objects.get(id=movie_id)
        item = cls.objects.get(user=user, movie=movie)
        item.watched = not item.watched
        item.save()
        return movie
