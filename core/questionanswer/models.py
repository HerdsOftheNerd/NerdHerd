from django.db import models
from users.models import Profile
from uuid import uuid4

class Question(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
  author = models.ForeignKey(Profile,on_delete=models.CASCADE)
  title = models.CharField(max_length=255)
  description = models.TextField()
  created = models.DateTimeField(auto_now_add=True)
  views = models.IntegerField(default=0)
  votes = models.IntegerField(default=0)
  
  def __str__(self):
    return f"{self.title[:50]}..."
  
class Answer(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
  author = models.ForeignKey(Profile,on_delete=models.SET_NULL,null=True)
  question = models.ForeignKey(Question,related_name='answers',on_delete=models.SET_NULL,null=True)
  text = models.TextField()
  created = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return self.text