from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token
from .models import Project, Task
from .forms import createNewTask
import json

## Create your views here.

# def csrf(request):
#   return JsonResponse({'csrfToken': get_token(request)})

# @csrf_exempt
# def ping(request):
#   return JsonResponse({'result': 'OK'})

# def index(request):
# 	return render(request, 'index.html')

@csrf_exempt
def projects(request):
	if request.method == 'GET':
		projects = list(Project.objects.values())
		return JsonResponse(projects, safe=False)
	elif request.method == 'POST':
		data = json.loads(request.body.decode('utf-8'))
		Project.objects.create(
			title=data.get('title', ''), 
			description=data.get('description', '')
		)
		return JsonResponse({'result': 'OK'})

@csrf_exempt
def project(request, project_id):
	if request.method == 'GET':
		project = get_object_or_404(Project, pk=project_id)
		return JsonResponse(project.to_json())
	elif request.method == 'PUT':
		data = json.loads(request.body.decode('utf-8'))
		project = get_object_or_404(Project, pk=project_id)
		project.title = data.get('title', '')
		project.description = data.get('description', '')
		project.save()
		return JsonResponse({'result': 'Project Updated'})
	elif request.method == 'DELETE':
		project = get_object_or_404(Project, pk=project_id)
		project.delete()
		return JsonResponse({'result': 'Project Deleted'})

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
