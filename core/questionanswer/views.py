from os import stat
from rest_framework import status
from rest_framework.response import Response
from .serializers import AnswerSerializer, QuestionSerializer,QuestionValidator,AnswerValidator
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from .models import Answer, Question
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def questions(request):
  if request.method == "GET":
    objs = Question.objects.all()
    serializer = QuestionSerializer(objs,many=True)
    return Response(serializer.data,status.HTTP_200_OK)
  
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_question(request):
  serializer = QuestionValidator(data=request.data)
  if serializer.is_valid():
    question = Question()
    question.author = request.user.profile
    question.title = serializer.data["title"]
    question.description = serializer.data["description"]
    question.save()
    return Response(serializer.data,status=status.HTTP_201_CREATED)
  else:
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_question(request,pk):
  serializer = QuestionValidator(data=request.data)
  if serializer.is_valid():
    question = Question.objects.get(id=pk)
    question.user = request.user
    question.title = serializer.data["title"]
    question.description = serializer.data["description"]
    question.save()
    return Response(serializer.data,status=status.HTTP_201_CREATED)
  else:
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

  
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_question(request,pk):
  try:
    obj = Question.objects.get(id=pk)
    if request.user.id == obj.user.id:
      serializer = QuestionSerializer(obj)
      obj.delete()
      return Response({
        'status' : True,
        'item' : serializer.data
        },status.HTTP_204_NO_CONTENT)
    else:
      raise Exception("You are not authorized to delete this question")
  except Exception as e:
    return Response({
        'status' : False,
        'error' : "{0}".format(e)
        },status.HTTP_404_NOT_FOUND)
  
@api_view(['GET'])
def question(request,pk):
  try:
    obj = Question.objects.get(id=pk)
    serializer = QuestionSerializer(obj)
    obj.views += 1
    obj.save()
    return Response(serializer.data)
  except Exception as e:
    return Response({
        'status' : False,
        'error' : "{0}".format(e)
        },status.HTTP_404_NOT_FOUND)
    
@api_view(['GET','POST'])
def answers(request,pk):
  if request.method == "GET":
    try:
      obj = Question.objects.get(id=pk)
      answers = obj.answers.all()
      serializer = AnswerSerializer(answers,many=True)
      return Response(serializer.data,status.HTTP_200_OK)
    except Exception as e:
      return Response({
          'status' : False,
          'error' : "{0}".format(e)
          },status.HTTP_404_NOT_FOUND)
  else:
      try:
        validator = AnswerValidator(data=request.data)
        if validator.is_valid():
          answer = Answer()
          question = Question.objects.get(id=pk)
          answer.user = request.user
          answer.text = validator.data["text"]
          answer.question = question
          answer.save()
          serializer = AnswerSerializer(answer)
          return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
          return Response(validator.errors,status=status.HTTP_400_BAD_REQUEST)
      except Exception as e:
        return Response({
            'status' : False,
            'error' : f'{e}'
            },status.HTTP_404_NOT_FOUND)  

@api_view(['GET','PATCH','DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def each_answers(request,pk,ans_pk):
  if request.method == "GET":
    try:
      question = Question.objects.get(id=pk)
      answer = question.answers.get(id=ans_pk)
      serializer = AnswerSerializer(answer)
      return Response(serializer.data)
    except Exception as e:
      return Response({
          'status' : False,
          'error' : 'Answer Does not exist'
          },status.HTTP_404_NOT_FOUND)  
  elif request.method == "DELETE":
    try:
      question = Question.objects.get(id=pk)
      answer = question.answers.get(id=ans_pk)
      serializer = AnswerSerializer(answer)
      if request.user.id == answer.user.id:
        answer.delete()
        return Response({
          'status' : True,
          'item' : serializer.data
          },status.HTTP_204_NO_CONTENT)
    except Exception as e:
      return Response({
          'status' : False,
          'error' : 'Answer Does not exist'
          },status.HTTP_404_NOT_FOUND)