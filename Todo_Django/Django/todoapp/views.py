from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render, redirect
from django.core.serializers import serialize
from .models import Project, Task
from .forms import createNewTask
import json

# Create your views here.
def index(request):
	return render(request, 'index.html')

def projects(request):
	if request.method == 'GET':
		projects = list(Project.objects.values())
		return JsonResponse(projects, safe=False)
	elif request.method == 'POST':
		Project.objects.create(
			title=request.POST['title'], 
			description=request.POST['description']
		)
		return redirect('/projects/')

def tasks(request, project_id):
	tasks = Task.objects.filter(project_id=project_id)
	serialized_tasks = serialize('json', tasks)
	deserialized_tasks = json.loads(serialized_tasks)
	return JsonResponse(deserialized_tasks, safe=False)

def createTask(request):
	if request.method == 'GET':
		return render(request, 'create_task.html', {'form': createNewTask()})
	else:
		Task.objects.create(title=request.POST['title'], description=request.POST['description'], project_id=request.POST['project'])
		return redirect(f'/tasks/{1}')
