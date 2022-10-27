from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class LoginValidator(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

class RegisterSerializer(serializers.Serializer):
  email = serializers.EmailField()
  username = serializers.CharField()
  password = serializers.CharField()
  
  def validate(self,data):
    if User.objects.filter(email=data["email"]).exists():
      raise serializers.ValidationError("Email is already taken")
    if User.objects.filter(username=data["username"]).exists():
      raise serializers.ValidationError("Username is already taken")
    return data
  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data["username"],
      email=validated_data["email"]
    )
    user.set_password(validated_data["password"])
    user.save()
    return user

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = "__all__"

  