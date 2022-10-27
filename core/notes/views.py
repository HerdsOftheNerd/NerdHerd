from urllib import response
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from .models import *



@api_view(['GET'])
def notes(request):
  notes = Note.objects.all()
  serialize = NoteSerializer(notes,many=True)
  return Response(serialize.data)