from .models import FrontPage, FrontText
from rest_framework import serializers


class FrontTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrontText
        fields = ('id', 'text')


class FrontPageSerializer(serializers.ModelSerializer):
    front_text = serializers.SerializerMethodField()

    def get_front_text(self, obj):
        texts = obj.fronttext_set.all()
        return FrontTextSerializer(texts, many=True).data

    class Meta:
        model = FrontPage
        fields = ('id', 'page_name', 'front_text')
