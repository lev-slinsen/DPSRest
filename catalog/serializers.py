from .models import Pizza, Filter
from rest_framework import serializers


class FilterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Filter
        fields = ('name',)


class PizzaSerializer(serializers.HyperlinkedModelSerializer):
    filter = FilterSerializer(read_only=True, many=True)
    photo_thumbnail = serializers.ImageField()

    class Meta:
        model = Pizza
        fields = ('id',
                  'name',
                  'size',
                  'price',
                  'text_short',
                  'text_long',
                  'photo',
                  'photo_thumbnail',
                  'filter')
