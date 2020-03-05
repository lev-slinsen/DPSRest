from django.db import models
from django.utils.translation import pgettext_lazy as _


class FrontPage(models.Model):
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


class WorkMonth(models.Model):
    MONTH_CHOICES = (
        (1, _('Month|1', 'January')),
        (2, _('Month|2', 'February')),
        (3, _('Month|3', 'March')),
        (4, _('Month|4', 'April')),
        (5, _('Month|4', 'May')),
        (6, _('Month|4', 'June')),
        (7, _('Month|4', 'July')),
        (8, _('Month|4', 'August')),
        (9, _('Month|4', 'September')),
        (10, _('Month|4', 'October')),
        (11, _('Month|4', 'November')),
        (12, _('Month|4', 'December')),
    )
    month = models.SmallIntegerField(
        choices=MONTH_CHOICES,
        verbose_name=_('Front|Month field', 'Month'),
    )
    id = models.PositiveSmallIntegerField(primary_key=True, verbose_name=_('Front|Month id', 'Month id'))

    class Meta:
        verbose_name = _('Front|Month', 'Month')
        verbose_name_plural = _('Front|Month plural', 'Months')

    def __str__(self):
        return f"{self.month}"


class WorkDate(models.Model):
    date = models.DateField(unique=True, verbose_name=_('Front|Date field', 'Date'))
    month = models.ForeignKey(WorkMonth, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Front|Date', 'Date')
        verbose_name_plural = _('Front|Dates', 'Dates')

    def __str__(self):
        return f"{self.date}"
