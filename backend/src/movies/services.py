from django.core.mail import send_mail


def send_mail_to_admin(movie):
    send_mail(
        'New movie: {}'.format(movie.title),
        'Title: {}\nDescription: {}\nGenre: {}'.format(
            movie.title, movie.description, movie.genre),
        'from@example.com',
        ['to@example.com'],
        fail_silently=False,
    )
