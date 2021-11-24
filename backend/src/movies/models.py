from django.db import models


class Movie(models.Model):
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
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=500, blank=False)
    cover = models.CharField(max_length=500, blank=False)
    genre = models.CharField(
        max_length=15,
        choices=GENRE_CHOICES,
        blank=True
    )
    views = models.PositiveBigIntegerField(default=0)

    @classmethod
    def get_queryset(cls, request):
        queryset = cls.objects.all()
        title = request.query_params.get('title')
        if title is not None:
            queryset = queryset.filter(title__icontains=title)
        return queryset

    @classmethod
    def increment_views(cls, pk):
        movie = cls.objects.get(id=pk)
        movie.views += 1
        movie.save()
        return movie
