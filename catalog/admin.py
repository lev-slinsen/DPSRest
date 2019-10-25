from django.contrib import admin

from django.db import models
from django.forms import CheckboxSelectMultiple

from .models import Pizza, Filter


@admin.register(Pizza)
class PizzaAdmin(admin.ModelAdmin):
    list_display = ('name',)
    list_filter = ('filter__name',)

    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


admin.site.register(Filter)
