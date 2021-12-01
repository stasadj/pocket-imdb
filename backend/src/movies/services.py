from elasticsearch_dsl.query import MultiMatch, Match
from .documents import MovieDocument


def get_queryset_elasticsearch(request):
    title = request.query_params.get('title').lower()
    genre = request.query_params.get('genre').lower()
    queryset = MovieDocument.search().query('wildcard', title='*{}*'.format(title)
                                            ).query('wildcard', genre='*{}*'.format(genre)).to_queryset()
    return queryset
