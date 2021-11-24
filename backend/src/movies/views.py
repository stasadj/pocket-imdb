from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .serializers import MovieSerializer
from .models import Movie


class MovieListAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination
    serializer_class = MovieSerializer

    def get_queryset(self):
        return Movie.get_queryset(self.request)


class MovieRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Movie.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = MovieSerializer

    def partial_update(self, request, pk):
        return Response(MovieSerializer(Movie.increment_views(pk)).data)
