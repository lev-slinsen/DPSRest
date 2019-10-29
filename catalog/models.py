"""
Catalogue models.
"""
from django.db import models
from django.utils.translation import pgettext_lazy as _


class Filter(models.Model):
    """
    Category model.
    """
    name = models.CharField(verbose_name=_('Filter|Name', 'Name'), max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Filter|Meta', 'Filter')
        verbose_name_plural = _('Filter|Meta plural', 'Filters')


class Pizza(models.Model):
    """
    Pizza model.
    """
    CHOICES = (
        ('1', _('Size|1', '1')),
        ('2', _('Size|2', '2')),
        ('3', _('Size|3', '3')),
        ('4', _('Size|4', '4')),
    )
    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(verbose_name=_('Pizza|Name', 'Name'), max_length=100)
    size = models.CharField(choices=CHOICES, verbose_name=_('Pizza|Size', 'Size'), max_length=1)
    price = models.DecimalField(default=0, max_digits=6, decimal_places=2, verbose_name=_('Pizza|Price', 'Price'))
    text_short = models.CharField(verbose_name=_('Pizza|Short text', 'Short text'), max_length=100)
    text_long = models.TextField(verbose_name=_('Pizza|Long text', 'Long text'))
    filter = models.ManyToManyField(Filter, verbose_name=_('Pizza|Filter', 'Filter'))
    photo = models.ImageField(upload_to='images/', verbose_name=_('Pizza|Image', 'Image'))
    active = models.BooleanField(verbose_name=_('Pizza|Active', 'Active'))

    class Meta:
        verbose_name = _('Pizza|Meta', 'Pizza')
        verbose_name_plural = _('Pizza|Meta plural', 'Pizzas')

    @property
    def size_display(self):
        return ' '.join(str(cat) for cat in self.size.all())

    def __str__(self):
        #    return "name = {}, size = {}".format(self.name, self.size)
        #    return "name = %s, size = %s" % (self.name, self.size)
        return f"{self.name}"
