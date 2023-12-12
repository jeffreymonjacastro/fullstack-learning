from django.urls import path
from . import views

urlpatterns = [
	path('', views.index),
	path('about/', views.about),
	path('hello/<str:username>', views.hello),
	path('math/<int:id>', views.math),
	path('projects/', views.projects),
	path('tasks/<int:id>', views.tasks),
	path('createTask/', views.createTask),
]