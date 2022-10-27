from django.db import models
import uuid
from users.models import Profile

  
class Institution(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    notes = models.ManyToManyField('Note', related_name='institutions', blank=True)

    def __str__(self):
        return self.name

class City(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  name = models.CharField(max_length=255)
  created_at = models.DateTimeField(auto_now_add=True)
  institutions = models.ManyToManyField(Institution, related_name='cities', blank=True)
  
  def __str__(self):
    return self.name
  
class State(models.Model):
  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  name = models.CharField(max_length=255)
  created_at = models.DateTimeField(auto_now_add=True)
  cities = models.ManyToManyField(City, related_name='states', blank=True)

  def __str__(self):
    return self.name

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
  city = models.CharField(max_length=100)
  state = models.CharField(max_length=100)
  board = models.CharField(max_length=100)
  institution = models.CharField(max_length=100)
  
  def __str__(self):
    return f"{self.topic[:50]}..."
  
class Review(models.Model):
  id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
  author  = models.ForeignKey(Profile,on_delete=models.CASCADE)
  note = models.ForeignKey(Note,on_delete=models.CASCADE)
  rating = models.IntegerField(default=0)
  review = models.TextField()
  created = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return f"{self.review[:50]}..."

class Comment(models.Model):
  id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
  author  = models.ForeignKey(Profile,on_delete=models.CASCADE)
  note = models.ForeignKey(Note, on_delete=models.CASCADE)
  comment = models.TextField()
  created = models.DateTimeField(auto_now_add=True)
  
  def __str__(self):
    return f"{self.comment[:50]}..."

class Transaction(models.Model):
  id = models.UUIDField(default=uuid.uuid4,unique=True,primary_key=True,editable=False)
  seller = models.ForeignKey(Profile,on_delete=models.DO_NOTHING,related_name='seller')
  buyer = models.ForeignKey(Profile,on_delete=models.DO_NOTHING,related_name='buyer')
  note = models.ForeignKey(Note,on_delete=models.DO_NOTHING)
  timestamp = models.DateTimeField(auto_now_add=True)
  amount = models.FloatField()
  success = models.BooleanField(default=False)
  # transaction_id = models.CharField(max_length=100)]