from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .serializers import MovieSerializer
from .models import Movie, GENRE_CHOICES


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
        return Response(MovieSerializer(Movie.increment_views(pk), context={'request': request}).data)


@api_view(http_method_names=['GET'])
@permission_classes([IsAuthenticated, ])
def get_genres(request):
    return Response([genre[1] for genre in GENRE_CHOICES])


@api_view(http_method_names=['PATCH'])
@permission_classes([IsAuthenticated, ])
def like_movie(request, pk):
    return Response(MovieSerializer(Movie.like_movie(request.user, pk), context={'request': request}).data)


@api_view(http_method_names=['PATCH'])
@permission_classes([IsAuthenticated, ])
def dislike_movie(request, pk):
    return Response(MovieSerializer(Movie.dislike_movie(request.user, pk), context={'request': request}).data)


@api_view(http_method_names=['POST'])
@permission_classes([IsAuthenticated, ])
def add_comment(request, pk):
    return Response(MovieSerializer(Movie.add_comment(request, pk), context={'request': request}).data)
