from .models import Order
from .serializers import OrderSerializer
from rest_framework import generics, viewsets


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    http_method_names = ['post', 'get']
