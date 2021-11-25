from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    liked_by_user = serializers.SerializerMethodField()
    disliked_by_user = serializers.SerializerMethodField()

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'cover', 'genre', 'views',
                  'likes', 'dislikes', 'liked_by_user', 'disliked_by_user']

    def get_likes(self, obj):
        return obj.likes.count()

    def get_dislikes(self, obj):
        return obj.dislikes.count()

    def get_liked_by_user(self, obj):
        user = self.context.get('request').user
        return True if obj.likes.filter(id=user.id).exists() else False

    def get_disliked_by_user(self, obj):
        user = self.context.get('request').user
        return True if obj.dislikes.filter(id=user.id).exists() else False
