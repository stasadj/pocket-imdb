from django.core.paginator import Page
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .serializers import MovieSerializer
from .models import Movie


class MovieAPIView(ListAPIView):
    queryset = Movie.objects.all()
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination
    serializer_class = MovieSerializer
