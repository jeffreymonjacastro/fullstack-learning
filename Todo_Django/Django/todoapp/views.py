from django.http import HttpResponse, JsonResponse
from .models import Project, Task
from django.shortcuts import get_object_or_404, render, redirect
from .forms import createNewTask

# Create your views here.
def index(request):
	return render(request, 'index.html')

def projects(request):
	projects = list(Project.objects.values())
	return JsonResponse(projects, safe=False)

def tasks(request):
	tasks = list(Task.objects.values())
	return JsonResponse(tasks, safe=False)

def createTask(request):
	if request.method == 'GET':
		return render(request, 'create_task.html', {'form': createNewTask()})
	else:
		Task.objects.create(title=request.POST['title'], description=request.POST['description'], project_id=request.POST['project'])
		return redirect(f'/tasks/{1}')
