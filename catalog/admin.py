from django.contrib import admin

from django.db import models
from django.forms import CheckboxSelectMultiple

from .models import Pizza, Filter


class PizzaAdmin(admin.ModelAdmin):
    list_display = ('name',)
    fields = ('name', 'price', 'size', 'text_short', 'text_long', 'filter', 'photo')
    list_filter = ('filter__name',)

    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


admin.site.register(Pizza, PizzaAdmin)
admin.site.register(Filter)
