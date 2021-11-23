from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from . import services
from src.users.serializers import UserSerializer


@api_view(http_method_names=['POST'])
@permission_classes([AllowAny])
def login(request):
    return Response(services.login(request))


@api_view(http_method_names=['POST'])
@permission_classes([AllowAny])
def register(request):
    return Response(UserSerializer(services.register(request)).data)
