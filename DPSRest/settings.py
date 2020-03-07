"""
Django settings for DPSRest project.

Generated by 'django-admin startproject' using Django 2.2.6.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import dj_database_url

from django.conf.global_settings import DATABASES
from django.utils.translation import pgettext_lazy as _

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DJANGO_DEBUG', False)

ALLOWED_HOSTS = [os.environ.get('HOST_NAME', 'localhost'), os.environ.get('HOST_IP', '127.0.0.1')]


# Application definition

INSTALLED_APPS = [
    # django core apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    # custom apps
    'accounts.apps.AccountsConfig',
    'catalog.apps.CatalogConfig',
    'front.apps.FrontConfig',
    'shop.apps.ShopConfig',
    # plugins
    'corsheaders',
    'rest_framework',
    'imagekit',
    'drf_yasg',
]

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler',
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}

AUTH_USER_MODEL = 'accounts.User'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'accounts.middleware.UserLanguageMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

CORS_ORIGIN_WHITELIST = [
    'https://localhost:8000',
    'http://localhost:8000',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost',
    'https://localhost',
    'https://127.0.0.1:8000',
    'https://127.0.0.1:3000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000'
]
CSRF_COOKIE_NAME = "csrftoken"

ROOT_URLCONF = 'DPSRest.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR + '/react/',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.i18n',
            ],
        },
    },
]

WSGI_APPLICATION = 'DPSRest.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES['default'] = dj_database_url.config(
    default=os.environ.get('DJANGO_DB'))


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGES = (
    ('en', _('Language|English', 'English')),
    ('ru', _('Language|Russian', 'Russian')),
)

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

FORMAT_MODULE_PATH = [
    'catalog.formats',
]

USE_TZ = True

LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'locale'),
)


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_DIRS = [
    'react/build/static/',
]

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, "media")

SITE_ID = 1
