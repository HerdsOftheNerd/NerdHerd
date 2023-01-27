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

class ProfileValidator(serializers.Serializer):
  username = serializers.CharField()
  name = serializers.CharField()
  email = serializers.EmailField()
  bio = serializers.CharField()
  phone_number = serializers.IntegerField()
  
  def validate(self,data):
    return data
  
  def update(self, instance, validated_data):
    print(validated_data)
    instance.name = validated_data.get('name')
    instance.email = validated_data.get('email')
    instance.username = validated_data.get('username')
    instance.bio = validated_data.get('bio')
    instance.phone_number = validated_data.get('phone_number')
    instance.save()
    return instance
