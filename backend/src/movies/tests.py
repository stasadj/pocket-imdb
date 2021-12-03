from django.test import TestCase
from src.users.models import User
from .models import Movie


class MovieTestCase(TestCase):
    def setUp(self):
        Movie.objects.create(
            title='Test 1', description='...', genre='Fantasy')
        Movie.objects.create(title='Test 2',
                             description='...', genre='Sci-Fi')
        Movie.objects.create(
            title='Test 3', description='...', genre='Fantasy')
        Movie.objects.create(title='Test 4',
                             description='...', genre='Sci-Fi')
        Movie.objects.create(
            title='Test 5', description='...', genre='Fantasy')
        Movie.objects.create(title='Test 6',
                             description='...', genre='Sci-Fi')

        User.objects.create(username='test@test.com', password='test123')

    def test_like_movie(self):
        user = User.objects.get(username='test@test.com')
        movie = Movie.objects.get(title='Test 1')
        likes_before = movie.likes.count()
        dislikes_before = movie.dislikes.count()

        Movie.like_movie(user, movie.id)

        self.assertEquals(movie.likes.count(), likes_before + 1)
        self.assertEquals(movie.dislikes.count(), dislikes_before)

    def test_undo_like_movie(self):
        user = User.objects.get(username='test@test.com')
        movie = Movie.objects.get(title='Test 2')
        likes_before = movie.likes.count()
        dislikes_before = movie.dislikes.count()

        Movie.like_movie(user, movie.id)
        Movie.like_movie(user, movie.id)

        self.assertEquals(movie.likes.count(), likes_before)
        self.assertEquals(movie.dislikes.count(), dislikes_before)

    def test_dislike_movie(self):
        user = User.objects.get(username='test@test.com')
        movie = Movie.objects.get(title='Test 3')
        dislikes_before = movie.likes.count()
        likes_before = movie.likes.count()

        Movie.dislike_movie(user, movie.id)

        self.assertEquals(movie.dislikes.count(), dislikes_before + 1)
        self.assertEquals(movie.likes.count(), likes_before)

    def test_undo_dislike_movie(self):
        user = User.objects.get(username='test@test.com')
        movie = Movie.objects.get(title='Test 4')
        dislikes_before = movie.dislikes.count()
        likes_before = movie.likes.count()

        Movie.dislike_movie(user, movie.id)
        Movie.dislike_movie(user, movie.id)

        self.assertEquals(movie.dislikes.count(), dislikes_before)
        self.assertEquals(movie.likes.count(), likes_before)

    def test_like_disliked_movie(self):
        user = User.objects.get(username='test@test.com')
        movie = Movie.objects.get(title='Test 5')

        Movie.dislike_movie(user, movie.id)

        dislikes_before = movie.dislikes.count()
        likes_before = movie.likes.count()

        Movie.like_movie(user, movie.id)

        self.assertEquals(movie.dislikes.count(), dislikes_before - 1)
        self.assertEquals(movie.likes.count(), likes_before + 1)

    def test_dislike_liked_movie(self):
        user = User.objects.get(username='test@test.com')
        movie = Movie.objects.get(title='Test 6')

        Movie.like_movie(user, movie.id)

        likes_before = movie.likes.count()
        dislikes_before = movie.dislikes.count()

        Movie.dislike_movie(user, movie.id)

        self.assertEquals(movie.likes.count(), likes_before - 1)
        self.assertEquals(movie.dislikes.count(), dislikes_before + 1)
