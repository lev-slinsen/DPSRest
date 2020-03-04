from django.contrib import admin
from django.contrib.admin.widgets import RelatedFieldWidgetWrapper
from django.utils.translation import pgettext_lazy as _

from .models import OrderItem, Order


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    fields = ('pizza', 'quantity', 'price_admin')
    readonly_fields = ('price_admin',)
    exclude = ('order_items',)
    extra = 0

    def formfield_for_dbfield(self, db_field, *args, **kwargs):
        """
        Remove popup add/edit/delete icons by default for relation fields.
        """
        if db_field.is_relation:
            rel = db_field.related_model
            wrapped_widget = RelatedFieldWidgetWrapper(
                db_field.formfield().widget,
                rel,
                admin.site,
                can_add_related=False,
                can_change_related=False,
                can_delete_related=False
            )
            db_field.formfield().widget = wrapped_widget
            return db_field.formfield()
        return super(OrderItemInline, self).formfield_for_dbfield(db_field, **kwargs)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    readonly_fields = ('total_price',)
    list_display = (
        'phone',
        'status',
        'delivery_date',
        'delivery_time',
        'first_name',
        'total_price',
        'payment'
    )
    date_hierarchy = 'delivery_date'
    exclude = ('user',)
    inlines = (OrderItemInline,)
