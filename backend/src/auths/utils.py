from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['username'] = user.username
    refresh['first_name'] = user.first_name
    refresh['last_name'] = user.last_name

    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }
