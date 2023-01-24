from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import LoginValidator,RegisterSerializer,ProfileSerializer
from django.contrib.auth import authenticate
from .models import Profile

@api_view(['POST'])
def login_user(request):
  data = request.data
  serializer = LoginValidator(data=data)
  if not serializer.is_valid():
    return Response({
      'status': False,
      'message': serializer.errors
    },status.HTTP_400_BAD_REQUEST)
  
  user = authenticate(username=serializer.data["username"],
                      password=serializer.data["password"])
  if user:
    token,_ = Token.objects.get_or_create(user=user) 
    serializer = ProfileSerializer(user.profile)
    return Response({
      'status':True,
      'token':str(token),
      'user':serializer.data
    },status=status.HTTP_200_OK)
  else:
    return Response({
      'error':"Wrong Username or Password"
    },status=status.HTTP_401_UNAUTHORIZED)
      
@api_view(['POST'])
def register_user(request):
  serializer = RegisterSerializer(data=request.data)
  if not serializer.is_valid():
    return Response({
    'status': False,
    'error': serializer.errors
  },status.HTTP_400_BAD_REQUEST)
  else:
    user = serializer.save()
    token, _ = Token.objects.get_or_create(user=user)
    if token:
      serializer = ProfileSerializer(user.profile)
      return Response({
      'status':True,
      'message':"User created",
      'token':str(token),
      'profile':serializer.data
    },status=status.HTTP_201_CREATED)
    
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
@api_view(['GET'])
def get_user(request):
  # try:
  profile = Profile.objects.get(user__id=request.user.id)
  serializer = ProfileSerializer(profile)
  return Response({
    'status':True,
    'user':serializer.data
  },status=status.HTTP_200_OK)
  # except:
  #   return Response(
  #     {
  #       'status':False,
  #       'error':"User not found"
  #     },status.HTTP_400_BAD_REQUEST)
    