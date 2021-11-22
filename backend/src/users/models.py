from django.contrib.auth.models import AbstractUser
from easy_thumbnails.fields import ThumbnailerImageField


class User(AbstractUser):
    profile_picture = ThumbnailerImageField(
        'ProfilePicture', upload_to='profile_pictures/', blank=True, null=True)
