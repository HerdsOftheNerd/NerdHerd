from django.db import models
import uuid
from users.models import Profile

class Note(models.Model):
  id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
  author = models.ForeignKey(Profile,on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)
  approved = models.BooleanField(default=False)
  approved_date = models.DateTimeField(null=True,blank=True)
  topic = models.TextField()
  subject = models.TextField()
  purchases = models.IntegerField(default=0)
  cost = models.FloatField(null=False)
  note_pdf = models.FileField(upload_to='notes',null=False,blank=False)
  preview_page_no = models.IntegerField(default=1)
  
  def __str__(self):
    return f"{self.topic[:50]}..."
  
class Review(models.Model):
  id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
  author  = models.ForeignKey(Profile,on_delete=models.CASCADE)
  note = models.ForeignKey(Note,on_delete=models.CASCADE)
  rating = models.IntegerField(default=0)
  review = models.TextField()
  
  def __str__(self):
    return f"{self.review[:50]}..."

class Comment(models.Model):
  id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
  author  = models.ForeignKey(Profile,on_delete=models.CASCADE)
  note = models.ForeignKey(Note, on_delete=models.CASCADE)
  comment = models.TextField()
  
  def __str__(self):
    return f"{self.comment[:50]}..."

class Transaction(models.Model):
  seller = models.ForeignKey(Profile,on_delete=models.DO_NOTHING,related_name='seller')
  buyer = models.ForeignKey(Profile,on_delete=models.DO_NOTHING,related_name='buyer')
  note = models.ForeignKey(Note,on_delete=models.DO_NOTHING)
  timestamp = models.DateTimeField(auto_now_add=True)
  success = models.BooleanField(default=False)