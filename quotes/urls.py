from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('stored_quotes/', views.stored_quotes, name='stored_quotes'),
    path('update_costs/', views.update_costs, name='update_costs'),
]