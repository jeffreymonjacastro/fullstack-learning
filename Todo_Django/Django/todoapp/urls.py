from django.urls import path
from . import views

urlpatterns = [
	path('csrf/', views.csrf),
	path('ping/', views.ping),
	path('', views.index),
	path('projects/', views.projects),
	path('project/<int:project_id>', views.project),
	path('tasks/<int:project_id>', views.tasks),
	# path('createproject/', views.createProject),
	# path('createtask/', views.createTask),
]