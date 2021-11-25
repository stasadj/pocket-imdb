from rest_framework import serializers
from .models import Movie, Comment


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SlugRelatedField(source='user', read_only=True,
                                            slug_field='username')

    class Meta:
        model = Comment
        fields = ['id', 'content', 'username']


class MovieSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    liked_by_user = serializers.SerializerMethodField()
    disliked_by_user = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True)

    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'cover', 'genre', 'views',
                  'likes', 'dislikes', 'liked_by_user', 'disliked_by_user', 'comments']

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
