from .models import Pizza, Size, Taste
from rest_framework import serializers


class SizeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Size
        fields = ['name']


class TasteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Taste
        fields = ['name']


class PizzaSerializer(serializers.HyperlinkedModelSerializer):
    size = SizeSerializer(read_only=True, many=True)
    taste = TasteSerializer(read_only=True, many=True)

    class Meta:
        model = Pizza
        fields = ['name', 'price', 'text_short', 'text_long', 'size', 'taste']
