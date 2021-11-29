# Generated by Django 3.2.9 on 2021-11-29 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0005_comment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='genre',
            field=models.CharField(blank=True, choices=[(1, 'Fantasy'), (2, 'Action'), (3, 'Adventure'), (4, 'Drama'), (5, 'Horror'), (6, 'Sci-Fi'), (7, 'Thriller'), (8, 'Biography'), (9, 'Comedy'), (10, 'Crime'), (11, 'History')], max_length=15),
        ),
    ]