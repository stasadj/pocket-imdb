# Generated by Django 3.2.9 on 2021-11-24 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_movies_db'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='views',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]
