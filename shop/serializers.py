import re

from .models import Order, OrderItem
from rest_framework import serializers


class OrderSerializer(serializers.HyperlinkedModelSerializer):
    def validate(self, data):
        # phone validation
        phone = data.get('phone')
        if len(phone) != 3:
            raise serializers.ValidationError({'phone': 'must be 9 digits long'})
        regex_num = re.compile('^[0-9]+$')
        if not regex_num.match(phone):
            raise serializers.ValidationError({'phone': 'must only contain numbers'})
        # name validation
        first_name = data.get('first_name')
        regex_let = re.compile('^[a-zA-Zа-яА-Я]+$')
        if not regex_let.match(first_name):
            raise serializers.ValidationError({'first_name': 'must only contain letters'})

        return data

    class Meta:
        model = Order
        exclude = ('status',)


class OrderItemSerializer(serializers.HyperlinkedModelSerializer):
    order = OrderSerializer()

    class Meta:
        model = OrderItem
        fields = ('pizza_id', 'quantity', 'order')
