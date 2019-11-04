from .models import Order
from .serializers import OrderSerializer
from rest_framework import generics


class OrderListCreate(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
