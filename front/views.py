from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import viewsets
from .serializers import FrontPageSerializer
from .models import FrontPage


@ensure_csrf_cookie
def index(request):
    return render(request, 'front/index.html')


class PageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = FrontPage.objects.all()
    serializer_class = FrontPageSerializer
    http_method_names = ['get']
