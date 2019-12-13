from django.db import models
from django.utils.translation import pgettext_lazy as _
from imagekit.models import ImageSpecField
from pilkit.processors import ResizeToFit


class FrontPage(models.Model):
    id = models.PositiveSmallIntegerField(primary_key=True)
    page_name = models.CharField(max_length=100, verbose_name=_('Front|Page', 'HTML page'))

    def __str__(self):
        return f"{self.page_name}"


class FrontText(models.Model):
    text = models.TextField(max_length=1000, verbose_name=_('Front|Text', 'HTML text'))
    text_name = models.CharField(max_length=20, verbose_name=_('Front|Text name', 'HTML text name'))
    front_page = models.ForeignKey(FrontPage, on_delete=models.CASCADE)

    def __str__(self):
        return f""


class FrontImage(models.Model):
    image = models.ImageField(verbose_name=_('Front|Image', 'HTML image'))
    image_name = models.CharField(max_length=20, verbose_name=_('Front|Image name', 'HTML image name'))
    front_page = models.ForeignKey(FrontPage, on_delete=models.CASCADE)

    def __str__(self):
        return f""
