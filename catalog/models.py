"""
Catalogue models.
"""
from django.db import models
from django.utils.translation import pgettext_lazy as _


class Size(models.Model):
    """
    Category model.
    """
    name = models.CharField(verbose_name=_('Size|Name', 'Name'), max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Size|Meta', 'Size')
        verbose_name_plural = _('Size|Meta_plural', 'Sizes')


class Taste(models.Model):
    """
    Category model.
    """
    name = models.CharField(verbose_name=_('Taste|Name', 'Name'), max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Taste|Meta', 'Taste')
        verbose_name_plural = _('Taste|Meta_plural', 'Tastes')


class Pizza(models.Model):
    """
    Pizza model.
    """
    name = models.CharField(verbose_name=_('Pizza|Name', 'Name'), max_length=100)
    price = models.SmallIntegerField(verbose_name=_('Pizza|Price', 'Price'))
    text_short = models.CharField(verbose_name=_('Pizza|Short text', 'Short text'), max_length=100)
    text_long = models.TextField(verbose_name=_('Pizza|Long text', 'Long text'))
    size = models.ManyToManyField(Size, verbose_name=_('Pizza|Size', 'Size'))
    taste = models.ManyToManyField(Taste, verbose_name=_('Pizza|Taste', 'Taste'))
    photo = models.ImageField(upload_to='images/', verbose_name=_('Pizza|Image', 'Image'))

    class Meta:
        verbose_name = _('Pizza|Meta', 'Pizza')
        verbose_name_plural = _('Pizza|Meta_plural', 'Pizzas')

    @property
    def size_display(self):
        return ' '.join(str(cat) for cat in self.size.all())

    @property
    def taste_display(self):
        return ' '.join(str(cat) for cat in self.taste.all())

    def __str__(self):
        #    return "name = {}, size = {}".format(self.name, self.size)
        #    return "name = %s, size = %s" % (self.name, self.size)
        return f"{self.name}"
