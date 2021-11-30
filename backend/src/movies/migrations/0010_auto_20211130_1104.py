# Generated by Django 3.2.9 on 2021-11-30 11:04

from django.db import migrations
import easy_thumbnails.fields


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0009_remove_movie_cover'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coverimages',
            name='full_size',
            field=easy_thumbnails.fields.ThumbnailerImageField(blank=True, null=True, upload_to='static/full-size/'),
        ),
        migrations.AlterField(
            model_name='coverimages',
            name='thumbnail',
            field=easy_thumbnails.fields.ThumbnailerImageField(blank=True, null=True, upload_to='static/thumbnails/'),
        ),
    ]