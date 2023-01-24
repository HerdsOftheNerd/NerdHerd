from rest_framework import serializers
from .models import Paper

class PaperSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Paper
    fields = '__all__'
    
class PaperValidator(serializers.Serializer):
  subject = serializers.CharField()
  school = serializers.CharField()
  year = serializers.CharField()
  exam = serializers.CharField()
  standard = serializers.CharField()
  thumbnail = serializers.ImageField()
  pdf = serializers.FileField()
  
  