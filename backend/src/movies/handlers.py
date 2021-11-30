from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Movie
from .tasks import send_mail_task


@receiver(post_save, sender=Movie)
def send_mail(sender, instance, created, **kwargs):
    if created:
        send_mail_task.delay(
            {'title': instance.title, 'description': instance.description, 'genre': instance.genre})
