from django.contrib import admin
from django.contrib.admin.widgets import RelatedFieldWidgetWrapper
from django.db.models.signals import post_save
from django.utils.translation import pgettext_lazy as _
from .models import Pizza

from .models import OrderItem, Order
import io
from django.http import FileResponse
from reportlab.pdfgen import canvas


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    # queryset = OrderItem.objects.filter(category=1)
    fields = ('category', 'pizza', 'quantity', 'price_admin',)
    readonly_fields = ('price_admin', 'category',)
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


def make_confirmed(modeladmin, request, queryset):
    queryset.update(status=True)


make_confirmed.short_description = _('Admin actions|Make confirmed', 'Confirm selected orders')


def print_orders(modeladmin, request, queryset):
    print(queryset)
    for item in queryset:
        # Create a file-like buffer to receive PDF data.
        buffer = io.BytesIO()

        # Create the PDF object, using the buffer as its "file."
        p = canvas.Canvas(buffer)

        # Draw things on the PDF. Here's where the PDF generation happens.
        # See the ReportLab documentation for the full list of functionality.
        p.drawString(100, 100, "Hello world.")

        # Close the PDF object cleanly, and we're done.
        p.showPage()
        p.save()

        # FileResponse sets the Content-Disposition header so that browsers
        # present the option to save the file.
        buffer.seek(0)
        return FileResponse(buffer, as_attachment=True, filename='hello.pdf')


print_orders.short_description = _('Admin actions|Print orders', 'Print orders')


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
        'payment',
        'discount',
    )
    date_hierarchy = 'delivery_date'
    exclude = ('user',
               'order_items',
               'order_price')
    inlines = (OrderItemInline,)
    actions = (make_confirmed,
               print_orders)
