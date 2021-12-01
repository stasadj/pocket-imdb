from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Movie
from .tasks import send_mail_task

from django_elasticsearch_dsl.registries import registry


@receiver(post_save, sender=Movie)
def send_mail(sender, instance, created, **kwargs):
    if created:
        send_mail_task.delay(
            {'title': instance.title, 'description': instance.description, 'genre': instance.genre})


@receiver(post_save, sender=Movie)
def update_document(sender, instance, **kwargs):
    registry.update(instance)


@receiver(post_delete, sender=Movie)
def delete_document(sender, instance, **kwargs):
    registry.update(instance)
