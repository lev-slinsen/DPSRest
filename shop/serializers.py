from .models import Order, OrderItem
from rest_framework import serializers


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Order
        exclude = ('status',)


class OrderItemSerializer(serializers.HyperlinkedModelSerializer):
    order = OrderSerializer()
    #
    # class Meta:
    #     model = OrderItem
    #     fields = ('item_name', 'quantity', 'order')
    item_name = serializers.IntegerField()
    quantity = serializers.IntegerField()
