from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class FrontConfig(AppConfig):
    name = 'front'
    verbose_name = _('Front')
