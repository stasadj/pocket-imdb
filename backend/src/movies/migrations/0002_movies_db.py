# Generated by Django 3.2.9 on 2021-11-23 11:47

from django.db import migrations
import json
from random import randint


def populate_database(apps, schema_editor):
    Movie = apps.get_model('movies', 'Movie')
    f = open('Film.JSON',)
    data = json.load(f)
    f.close()

    for film in data:
        Movie.objects.create(
            title=film['Title'],
            description=film['Plot'],
            cover=film['Poster'].replace('http', 'https'),
            genre=get_genre(film['Genre'].split(',')),)


def get_genre(genres):
    genre = randint(0, 2)
    return genres[genre].strip()


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_database)
    ]
