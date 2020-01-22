from rest_framework import serializers
from .models import Order, OrderItem
import copy


class OrderItemSerializer(serializers.ModelSerializer):
    # quantity = serializers.IntegerField()
    # pizza = serializers.SerializerMethodField()
    #
    # def get_pizza(self, obj):
    #     print(obj.pizza.id)
    #     return obj.pizza.id

    class Meta:
        model = OrderItem
        fields = ('quantity',
                  'pizza',)


class OrderSerializer(serializers.ModelSerializer):
    # order_items = serializers.SerializerMethodField()
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ('phone',
                  'first_name',
                  'delivery_date',
                  'delivery_time',
                  'address',
                  'comment',
                  'payment',
                  'order_items')

    def create(self, validated_data, **kwargs):
        for_items = copy.deepcopy(validated_data)

        # create order object
        print('BEFORE', validated_data)
        del validated_data['order_items']
        print('AFTER', validated_data)
        order = Order.objects.create(**validated_data)

        # create order items
        for item in for_items.pop('order_items'):
            order_item = dict(item.items())
            print(order)
            OrderItem.objects.create(pizza=order_item.pop('pizza'), quantity=order_item.pop('quantity'), order=order)

        return order
