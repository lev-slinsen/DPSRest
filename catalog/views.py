from .models import Pizza
from rest_framework import viewsets
from .serializers import PizzaSerializer


class PizzaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
