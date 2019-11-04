from django.urls import path
from . import views

urlpatterns = [
    path('api/order/', views.OrderListCreate.as_view()),
]
