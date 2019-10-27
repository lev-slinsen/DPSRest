from .models import Pizza, Filter
from rest_framework import viewsets
from .serializers import PizzaSerializer, FilterSerializer


class FilterViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Filter.objects.all()
    serializer_class = FilterSerializer
    http_method_names = ['get']

    # def list(self, request, *args, **kwargs):
    #     response = super(FilterViewSet, self).list(request, *args, **kwargs)  # call the original 'list'
    #     response.data = {"data": {"filters": response.data}}  # customize the response data
    #     return response  # return response with this custom representation


class PizzaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Pizza.objects.all()
    serializer_class = PizzaSerializer
    http_method_names = ['get', 'post']
