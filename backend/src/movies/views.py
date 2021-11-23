from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .serializers import MovieSerializer
from .models import Movie


class MovieListAPIView(ListAPIView):
    queryset = Movie.objects.all()
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination
    serializer_class = MovieSerializer


class MovieRetrieveAPIView(RetrieveAPIView):
    queryset = Movie.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = MovieSerializer
