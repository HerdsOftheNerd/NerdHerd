from django.db import models
from django.contrib.auth.models import User
import uuid

class Profile(models.Model):
  id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
  user = models.OneToOneField(User,on_delete=models.CASCADE,null=True,blank=True)
  username = models.CharField(max_length=255,blank=True,null=True)
  name = models.CharField(max_length=255,blank=True,null=True)
  email = models.EmailField(max_length=500,blank=True,null=True)
  bio = models.TextField(blank=True,null=True)
  created = models.DateTimeField(auto_now_add=True)
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  profile_image = models.ImageField(upload_to='profile_pics', default="default.jpeg")
  is_admin = models.BooleanField(default=False)
  
  def __str__(self):
    return self.user.username
  