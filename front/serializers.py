from .models import FrontPage, FrontText, FrontImage
from rest_framework import serializers


class FrontTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrontText
        fields = ('text_name', 'text')


class FrontImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrontImage
        fields = ('image_name', 'image')


class FrontPageSerializer(serializers.ModelSerializer):
    front_text = serializers.SerializerMethodField()
    front_image = serializers.SerializerMethodField()

    def get_front_text(self, obj):
        texts = obj.fronttext_set.all()
        return FrontTextSerializer(texts, many=True).data

    def get_front_image(self, obj):
        images = obj.frontimage_set.all()
        return FrontImageSerializer(images, many=True).data

    class Meta:
        model = FrontPage
        fields = ('id', 'page_name', 'front_text', 'front_image')
