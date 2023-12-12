from django.db import models

# Create your models here.
class Project(models.Model):
	name = models.CharField(max_length=100)

	# Para que se vea el nombre del proyecto en el admin
	def __str__(self):
		return self.name

class Task(models.Model):
	title = models.CharField(max_length=100)
	description = models.TextField()
	project = models.ForeignKey(Project, on_delete=models.CASCADE)

	# Para que se vea el nombre de la tarea en el admin
	def __str__(self):
		return self.title + " - " + self.project.name