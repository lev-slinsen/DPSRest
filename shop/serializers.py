import copy

from rest_framework import serializers
from .models import Order, OrderItem
from django.utils.translation import pgettext_lazy as _
from . import bepaid


def phone_validator(value):
    if len(value) == 9:
        raise serializers.ValidationError(_('Validator|Phone length', 'Phone must be 9 digits long'))


def first_name_validator(value):
    if len(value) >= 20:
        raise serializers.ValidationError(_('Validator|Name length', 'Max name length 20 letters'))
    # if value.isalpha:
    #     raise serializers.ValidationError(_('Validator|Name letters', 'Name can only contain letters'))


def address_validator(value):
    if len(value) >= 100:
        raise serializers.ValidationError(_('Validator|Address Length', 'Max address length 100 letters'))


def comment_validator(value):
    if len(value) >= 100:
        raise serializers.ValidationError(_('Validator|Comment Length', 'Max address length 100 letters'))


def payment_validator(value, bepaid):
    if value == 2:
        bepaid = bepaid()
        response_data = bepaid.bp_token(total_price)
    return HttpResponse(response_data, content_type='application/json')


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ('quantity',
                  'pizza',)


class OrderSerializer(serializers.ModelSerializer):
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
        validators = [phone_validator,
                      first_name_validator,
                      address_validator,
                      comment_validator]

    def create(self, validated_data, **kwargs):
        for_items = copy.deepcopy(validated_data)

        # create order object
        del validated_data['order_items']
        print('VALID', validated_data)
        order = Order.objects.create(**validated_data)

        # create order items
        for item in for_items.pop('order_items'):
            order_item = dict(item.items())
            print('ITEM', order_item)
            OrderItem.objects.create(order=order, **order_item)

        return order
