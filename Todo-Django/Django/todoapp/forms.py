from django import forms

class createNewTask(forms.Form):
	title = forms.CharField(label="Title", max_length=100)
	description = forms.CharField(widget=forms.Textarea, label="Description", required=False)
	project = forms.IntegerField(label="Project")