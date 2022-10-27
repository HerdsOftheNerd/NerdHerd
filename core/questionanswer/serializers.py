from resource import error
from rest_framework import serializers
from .models import Answer, Question
from django.contrib.auth.models import User
from users.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    exclude = ["created","bio","email","name","user"]

class QuestionValidator(serializers.Serializer):
  title = serializers.CharField()
  description = serializers.CharField()
  
class AnswerValidator(serializers.Serializer):
  text = serializers.CharField()
  
    
class AnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Answer
    fields = "__all__"
    
class QuestionSerializer(serializers.ModelSerializer):
  author = ProfileSerializer()
  answers = AnswerSerializer(many=True)
  class Meta:
    model = Question
    fields = "__all__"
    