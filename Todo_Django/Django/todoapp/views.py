from django.http import HttpResponse, JsonResponse
from .models import Project, Task
from django.shortcuts import get_object_or_404, render, redirect
from .forms import createNewTask

# Create your views here.
def hello(request, username):
	return HttpResponse("<h1>Hello %s </h1>" % username)

def about(request):
	return HttpResponse("<h1>About</h1>")

def index(request):
	return render(request, 'index.html')

def math(request, id):
	result = id * 2 + 100
	return HttpResponse("<h1>Result: %s</h1>" % result)

def projects(request):
	projects = list(Project.objects.values())
	return JsonResponse(projects, safe=False)

def tasks(request, id):
	task = get_object_or_404(Task, id=id)
	return HttpResponse("task: %s" % task.title)

def createTask(request):
	if request.method == 'GET':
		return render(request, 'create_task.html', {'form': createNewTask()})
	else:
		Task.objects.create(title=request.POST['title'], description=request.POST['description'], project_id=request.POST['project'])
		return redirect(f'/tasks/{1}')
