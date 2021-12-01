from django.apps import AppConfig


class MoviesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'src.movies'

    def ready(self):
        import src.movies.handlers
