from django.db import models
from users.models import Profile


SUBJECT_CHOICES = (
  ("ENGLISH-1","ENGLISH-1"),
  ("ENGLISH-2","ENGLISH-2"),
  ("HINDI","HINDI"),
  ("BENGALI","BENGALI"),
  ("MATHS","MATHS"),
  ("PHYSICS","PHYSICS"),
  ("CHEMISTRY","CHEMISTRY"),
  ("BIOLOGY","BIOLOGY"),
  ("COMPUTER","COMPUTER"),
  ("HISTORY","HISTORY"),
  ("GEOGRAPHY","GEOGRAPHY"),
  ("ECONOMICS","ECONOMICS"),
  ("POLITICAL SCIENCE","POLITICAL SCIENCE"),
  ("PSYCHOLOGY","PSYCHOLOGY"),
  ("PHILOSOPHY","PHILOSOPHY"),
  ("SANSKRIT","SANSKRIT"),
  ("SOCIAL STUDIES","SOCIAL STUDIES"),
  ("GK","GK"),
)

class Paper(models.Model):
  subject = models.CharField(max_length=255,choices=SUBJECT_CHOICES,default='ENGLISH-1')
  school = models.CharField(max_length=255)
  year = models.CharField(max_length=255)
  exam = models.CharField(max_length=255)
  standard = models.CharField(max_length=10)
  author = models.ForeignKey(Profile, on_delete=models.SET_NULL,null=True,blank=True)
  created = models.DateTimeField(auto_now_add=True)
  thumbnail = models.ImageField(upload_to='papers/thumbnails')
  pdf = models.FileField(upload_to='papers/pdf')
  duration = models.IntegerField(default=2*60*60000)
  
  def __str__(self):
    return f"{self.school} {self.subject} {self.exam} {self.year} "