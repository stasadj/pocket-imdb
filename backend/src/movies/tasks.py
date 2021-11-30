from django.core.mail import send_mail
from django.core.exceptions import BadRequest
from celery import shared_task


@shared_task(autoretry_for=(TimeoutError, BadRequest,))
def send_mail_task(movie):
    send_mail(
        'New movie: {}'.format(movie['title']),
        'Title: {}\nDescription: {}\nGenre: {}'.format(
            movie['title'], movie['description'], movie['genre']),
        'from@example.com',
        ['to@example.com'],
        fail_silently=False,
    )
