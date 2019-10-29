from django.contrib import admin

from django.db import models
from django.forms import CheckboxSelectMultiple

from .models import Pizza, Filter


@admin.register(Pizza)
class PizzaAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'size')
    list_filter = ('filter__name', 'size')
    fields = ('id', 'name', 'size', 'price', 'text_short', 'text_long', 'photo', 'filter', 'active')

    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


admin.site.register(Filter)
