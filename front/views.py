from rest_framework import viewsets
from .serializers import FrontPageSerializer, FrontTextSerializer
from .models import FrontPage, FrontText


class FrontPageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = FrontPage.objects.all()
    serializer_class = FrontPageSerializer
    http_method_names = ['get']


class FrontTextViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = FrontText.objects.all()
    serializer_class = FrontTextSerializer
    http_method_names = ['get', 'post', 'put', 'delete']
