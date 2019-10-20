from .models import Pizza, Size
from rest_framework import viewsets
from .serializers import PizzaSerializer, SizeSerializer


class SizeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Size.objects.all()
    serializer_class = SizeSerializer


class PizzaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
