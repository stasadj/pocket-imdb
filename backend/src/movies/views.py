from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.response import Response
from .serializers import MovieSerializer, CommentSerializer
from .models import Comment, Movie, GENRE_CHOICES, WatchListItem


class MovieListCreateAPIView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination
    serializer_class = MovieSerializer

    def get_queryset(self):
        return Movie.get_queryset(self.request)

    def create(self, request):
        return Response(MovieSerializer(Movie.create(request), context={'request': request}).data)


class MovieRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Movie.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = MovieSerializer

    def partial_update(self, request, pk):
        return Response(MovieSerializer(Movie.increment_views(pk), context={'request': request}).data)


class CommentListAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = LimitOffsetPagination
    serializer_class = CommentSerializer

    def get_queryset(self):
        return Comment.get_queryset(self.kwargs.get('movie_id'))


@api_view(http_method_names=['GET'])
@permission_classes([IsAuthenticated, ])
def popular(request):
    return Response(MovieSerializer(Movie.popular(), context={'request': request}, many=True).data)


@api_view(http_method_names=['GET'])
@permission_classes([IsAuthenticated, ])
def related(request, movie_id):
    return Response(MovieSerializer(Movie.related(movie_id), context={'request': request}, many=True).data)


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
    return Response(CommentSerializer(Comment.add_comment(request, pk), context={'request': request}).data)


@api_view(http_method_names=['GET'])
@permission_classes([IsAuthenticated, ])
def watch_list(request):
    return Response(MovieSerializer(Movie.watch_list(request), context={'request': request}, many=True).data)


@api_view(http_method_names=['PATCH'])
@permission_classes([IsAuthenticated, ])
def watch_list_add_remove(request, movie_id):
    return Response(MovieSerializer(WatchListItem.add_remove(request.user, movie_id), context={'request': request}).data)
