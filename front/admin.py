from django.contrib import admin

from .models import FrontText, FrontPage


class FrontTextInline(admin.TabularInline):
    model = FrontText
    extra = 0


@admin.register(FrontPage)
class FrontPageAdmin(admin.ModelAdmin):
    model = FrontPage
    inlines = (FrontTextInline,)
