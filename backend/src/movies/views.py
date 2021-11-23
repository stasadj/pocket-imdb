from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import MovieSerializer
from .models import Movie


class MovieAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)

    def list(self, request):
        return Response(MovieSerializer(Movie.list(request), many=True).data)
