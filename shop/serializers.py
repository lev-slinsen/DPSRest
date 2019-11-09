from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.Serializer):
    quantity = serializers.IntegerField()
    pizza_id = serializers.SerializerMethodField()

    def get_pizza_id(self, obj):
        return obj.pizza_id.id

    class Meta:
        model = OrderItem
        fields = ('quantity',
                  'pizza_id',)


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()

    """
    Calculate order_items field 
    """
    def get_order_items(self, obj):
        items = obj.orderitem_set.all()
        return OrderItemSerializer(items, many=True).data

    class Meta:
        model = Order
        fields = ('phone',
                  'first_name',
                  'delivery_date',
                  'delivery_time',
                  'address',
                  'comment',
                  'payment',
                  'order_items',)
