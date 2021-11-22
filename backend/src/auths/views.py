from rest_framework.views import APIView
from rest_framework.response import Response
from .services import login


class LoginAPIView(APIView):

    def post(self, request, format=None):
        return Response(login(request))
