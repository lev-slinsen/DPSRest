from .models import Pizza, Filter
from rest_framework import viewsets
from .serializers import PizzaSerializer, FilterSerializer


class FilterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Filter.objects.all()
    serializer_class = FilterSerializer


class PizzaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
