from django.db import models
from src.users.models import User


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
    (10, 'History'),
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
    def increment_views(cls, pk):
        movie = cls.objects.get(id=pk)
        movie.views += 1
        movie.save()
        return movie
