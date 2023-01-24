from django.db import models
from users.models import Profile

class Paper(models.Model):
  subject = models.TextChoices('Subject', 'ENGLISH-1 ENGLISH-2 HINDI MATHS PHYSICS CHEMISTRY BIOLOGY COMPUTER HISTORY GEOGRAPHY ECONOMICS')
  school = models.CharField(max_length=255)
  year = models.IntegerField()
  exam = models.CharField(max_length=255)
  standard = models.IntegerField()
  author = models.ForeignKey(Profile, on_delete=models.SET_NULL,null=True,blank=True)
  created = models.DateTimeField(auto_now_add=True)
  thumbnail = models.ImageField(upload_to='papers/thumbnails')
  pdf = models.FileField(upload_to='papers/pdf')
  
  def __str__(self):
    return f"{self.school} {self.subject} {self.exam} {self.year} "