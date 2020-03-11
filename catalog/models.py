"""
Catalogue models.
"""
from django.db import models
from django.utils.translation import pgettext_lazy as _

from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill


class Filter(models.Model):
    """
    Filter model, multi choice
    """
    name = models.CharField(max_length=100,
                            verbose_name=_('Filter|Name', 'Name'))

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Filter|Meta', 'Filter')
        verbose_name_plural = _('Filter|Meta plural', 'Filters')


class Pizza(models.Model):
    """
    Pizza model.
    """
    CAT_CHOICES = (
        ('1', _('Size|1', '1')),
        ('2', _('Size|2', '2')),
        ('3', _('Size|3', '3')),
        ('4', _('Size|4', '4')),
    )
    id = models.PositiveSmallIntegerField(primary_key=True)
    name = models.CharField(max_length=45,
                            verbose_name=_('Pizza|Name', 'Name'))
    category = models.CharField(choices=CAT_CHOICES,
                                max_length=1,
                                verbose_name=_('Pizza|Category', 'Category'))
    price = models.DecimalField(default=0,
                                max_digits=6,
                                decimal_places=2,
                                verbose_name=_('Pizza|Price', 'Price'))
    text_short = models.CharField(max_length=100,
                                  verbose_name=_('Pizza|Short text', 'Short text'))
    text_long = models.TextField(verbose_name=_('Pizza|Long text', 'Long text'))
    filter = models.ManyToManyField(Filter,
                                    verbose_name=_('Pizza|Filter', 'Filter'))
    photo = models.ImageField(upload_to='images/',
                              verbose_name=_('Pizza|Image', 'Image'))
    photo_thumbnail = ImageSpecField(source='photo',
                                     processors=[ResizeToFill(100, 100)],
                                     format='JPEG',
                                     options={'quality': 90},)
    active = models.BooleanField(verbose_name=_('Pizza|Active', 'Active'))

    class Meta:
        verbose_name = _('Pizza|Meta', 'Pizza')
        verbose_name_plural = _('Pizza|Meta plural', 'Pizzas')

    @property
    def cat_display(self):
        return ' '.join(str(cat) for cat in self.category.all())

    def cat_list(self, obj):
        return self.category

    def __str__(self):
        return f"{self.name}"
