from .models import FrontPage
from rest_framework import serializers


class FrontPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FrontPage
        fields = ('page_name',)
