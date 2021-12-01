from django_elasticsearch_dsl import Document, Index, fields
from elasticsearch_dsl import analyzer

from .models import Movie

movie_index = Index('movies')
movie_index.settings(
    number_of_shards=1,
    number_of_replicas=1
)

html_strip = analyzer(
    'html_strip',
    tokenizer="standard",
    filter=["lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)


@movie_index.doc_type
class MovieDocument(Document):
    id = fields.IntegerField(attr='id')

    title = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword'),
        }
    )

    genre = fields.TextField(
        analyzer=html_strip,
        fields={
            'raw': fields.TextField(analyzer='keyword'),
        }
    )

    class Django(object):
        model = Movie
