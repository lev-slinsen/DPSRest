from rest_framework import viewsets
from .serializers import FrontPageSerializer
from .models import FrontPage


class PageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = FrontPage.objects.all()
    serializer_class = FrontPageSerializer
    http_method_names = ['get']
