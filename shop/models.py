from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import pgettext_lazy as _
from django.db.models.signals import post_save
from .bepaid import Bepaid
from django.http import HttpResponse

from catalog.models import Pizza


def bp_redirect(sender, instance, **kwargs):
    tp = instance.total_price()
    print("INSTANCE", instance.payment, tp)

    # if instance.payment == 2:
    #     total_price = instance.total_price
    #     print("TOTAL_PRICE", total_price)
    #     bp = Bepaid()
    #     response_data = bp.bp_token(total_price)
    #     print("HTTP", HttpResponse(response_data, content_type='application/json'))
    #     return HttpResponse(response_data, content_type='application/json')


class Order(models.Model):
    DELIVERY_TIME_CHOICES = [
        (0, '09-10'),
        (1, '10-11'),
        (2, '11-12'),
        (3, '12-13'),
        (4, '13-14'),
        (5, '14-15'),
        (6, '15-16'),
        (7, '16-17'),
        (8, '17-18'),
        (9, '18-18.30'),
    ]
    PAYMENT_CHOICES = [
        (0, _('Order|Cash', 'Cash')),
        (1, _('Order|Card', 'Card')),
        (2, _('Order|Online', 'Online')),
    ]
    phone = models.CharField(max_length=100, verbose_name=_('Order|Phone', 'Phone'))
    first_name = models.CharField(max_length=100, verbose_name=_('Order|Name', 'Name'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('Order|Created at', 'Created at'))
    delivery_date = models.DateField(verbose_name=_('Order|Delivery date', 'Delivery date'))
    delivery_time = models.SmallIntegerField(
        choices=DELIVERY_TIME_CHOICES,
        verbose_name=_('Order|Delivery time', 'Delivery time'),
    )
    address = models.CharField(max_length=100, verbose_name=_('Order|Address', 'Address'))
    comment = models.TextField(max_length=100, verbose_name=_('Order|Comment', 'Comment'), blank=True, null=True)
    payment = models.SmallIntegerField(choices=PAYMENT_CHOICES, verbose_name=_('Order|Payment', 'Payment method'))
    status = models.BooleanField(default=0, verbose_name=_('Order|Confirmed', 'Confirmed'))
    discount = models.SmallIntegerField(default=0,
                                        validators=[MinValueValidator(0), MaxValueValidator(100)],
                                        verbose_name=_('Order|Discount', 'Discount'))

    # Redundant field
    order_items = models.CharField(max_length=100)

    def total_price(self):
        price = sum([item.price for item in self.orderitem_set.all()])
        discount = 1 - self.discount / 100
        final_price = round(float(price) * float(discount), 2)
        return final_price

    # Total price field in Admin
    total_price.allow_tags = True
    total_price.short_description = _('Order|Total price', 'Total price')

    def __str__(self):
        return f"№ {self.id}"

    class Meta:
        verbose_name = _('Order|Meta', 'Order')
        verbose_name_plural = _('Order|Meta plural', 'Orders')


post_save.connect(bp_redirect, sender=Order)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name=_('OrderItem|Order', 'Order'))
    pizza = models.ForeignKey(Pizza, on_delete=models.CASCADE, verbose_name=_('OrderItem|Item', 'Item'))
    quantity = models.PositiveSmallIntegerField(verbose_name=_('OrderItem|Quantity', 'Quantity'))

    def pizza_id(self):
        return self.pizza.id

    @property
    def price(self):
        return self.pizza.price * self.quantity

    "Property admin panel translation"
    def price_admin(self):
        return self.price

    price_admin.short_description = _('OrderItem|Price', 'Price')

    def __str__(self):
        return f"{self.quantity}, {self.pizza}"

    class Meta:
        verbose_name = _('OrderItem|Meta', 'Item')
        verbose_name_plural = _('OrderItem|Meta plural', 'Items')
