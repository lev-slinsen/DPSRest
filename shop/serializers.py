from .models import Order, OrderItem
from rest_framework import serializers


class OrderItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('item_id', 'quantity')


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    filter = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        exclude = ('status',)
