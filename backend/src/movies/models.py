from django.db import models


class Movie(models.Model):
    GENRE_CHOICES = [
        (1, 'SCI-FI'),
        (2, 'HORROR'),
        (3, 'ACTION'),
        (4, 'DRAMA'),
        (5, 'COMEDY'),
        (6, 'DOCUMENTARY'),
        (7, 'THRILLER'),
    ]
    title = models.CharField(max_length=30, blank=False)
    description = models.CharField(max_length=100, blank=False)
    cover = models.CharField(max_length=100, blank=False)
    genre = models.CharField(
        max_length=15,
        choices=GENRE_CHOICES,
        blank=True
    )
