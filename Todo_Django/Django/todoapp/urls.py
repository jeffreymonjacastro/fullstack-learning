from django.urls import path
from . import views

urlpatterns = [
	path('', views.index),
	path('projects/', views.projects),
	path('tasks/<int:project_id>', views.tasks),
	# path('createproject/', views.createProject),
	# path('createtask/', views.createTask),
]