from django.contrib import admin

from django.db import models
from django.forms import CheckboxSelectMultiple

from .models import Pizza, Size, Taste


class PizzaAdmin(admin.ModelAdmin):
    list_display = ('name',)
    fields = ('name', 'price', 'text_short', 'text_long', 'size', 'taste', 'photo')
    list_filter = ('size__name', 'taste__name')

    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


admin.site.register(Pizza, PizzaAdmin)
admin.site.register(Size)
admin.site.register(Taste)
